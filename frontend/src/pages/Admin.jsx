import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeft, Inbox, Lock, LogOut } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "edn_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (tok) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/enquiries`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      setItems(data);
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
        setAuthError("Session expired. Please sign in again.");
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const submitLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem(TOKEN_KEY, data.token);
      setPassword("");
      setToken(data.token);
    } catch (err) {
      setAuthError(err?.response?.data?.detail || "Incorrect password. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setItems([]);
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-edn-warm px-6">
        <form
          onSubmit={submitLogin}
          data-testid="admin-login-form"
          className="w-full max-w-sm rounded-[24px] border border-edn-divider bg-white p-8 shadow-[0_30px_80px_rgba(17,17,17,0.1)]"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-edn-divider text-edn-ink">
              <Lock size={20} strokeWidth={1.6} />
            </span>
            <h1 className="font-serif text-3xl font-light text-edn-ink">Admin Access</h1>
            <p className="mt-1 text-sm text-edn-muted">Enter your password to view enquiries.</p>
          </div>
          <input
            data-testid="admin-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border border-edn-divider bg-white px-4 py-3 text-sm text-edn-ink outline-none transition-colors focus:border-edn-bronze"
          />
          {authError && (
            <p data-testid="admin-login-error" className="mt-3 text-sm text-red-600">
              {authError}
            </p>
          )}
          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={authLoading || !password}
            className="mt-5 w-full rounded-full bg-edn-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black disabled:opacity-60"
          >
            {authLoading ? "Checking..." : "Sign In"}
          </button>
          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-edn-muted hover:text-edn-bronze"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
        </form>
      </div>
    );
  }

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
          <div className="flex items-center gap-3">
            <button onClick={() => load(token)} className="flex items-center gap-2 rounded-full bg-edn-ink px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white hover:bg-black" data-testid="admin-refresh">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={logout} className="flex items-center gap-2 rounded-full border border-edn-divider bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-edn-ink hover:bg-edn-beige" data-testid="admin-logout">
              <LogOut size={14} /> Log out
            </button>
          </div>
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
