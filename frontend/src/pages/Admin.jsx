import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeft, Inbox } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/enquiries`);
      setItems(data);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-edn-warm px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/" className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-edn-muted hover:text-edn-bronze" data-testid="admin-back">
              <ArrowLeft size={14} /> Back to site
            </Link>
            <h1 className="font-serif text-4xl font-light text-edn-ink">Enquiries</h1>
            <p className="mt-1 text-sm text-edn-muted">{items.length} total submissions</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 rounded-full bg-edn-ink px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white hover:bg-black" data-testid="admin-refresh">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-edn-muted">Loading...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[24px] border border-edn-divider bg-white py-20 text-edn-muted" data-testid="admin-empty">
            <Inbox size={28} />
            <p>No enquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="admin-list">
            {items.map((e) => (
              <div key={e.id} className="rounded-[24px] border border-edn-divider bg-white p-6 shadow-sm" data-testid="admin-item">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl text-edn-ink">{e.name}</h3>
                  <span className="text-xs text-edn-muted">{new Date(e.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-edn-bronze">
                  <a href={`mailto:${e.email}`} className="hover:underline">{e.email}</a>
                  {e.phone && <span className="text-edn-muted">{e.phone}</span>}
                  {e.budget && <span className="text-edn-muted">Budget: {e.budget}</span>}
                  {e.postcode && <span className="text-edn-muted">{e.postcode}</span>}
                </div>
                {e.message && <p className="mt-3 text-sm leading-relaxed text-edn-ink/80">{e.message}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
