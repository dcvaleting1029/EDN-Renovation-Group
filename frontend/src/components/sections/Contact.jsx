import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { IMAGES, CONTACT } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BUDGET_OPTIONS = [
  "£10,000", "£20,000", "£30,000", "£40,000", "£50,000", "£60,000", "Bigger budget...",
];

const Field = ({ label, testid, textarea, ...props }) => {
  const [focus, setFocus] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Tag
        data-testid={testid}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={label}
        rows={textarea ? 4 : undefined}
        className="w-full resize-none rounded-2xl border border-edn-divider bg-white/80 px-5 py-4 text-sm text-edn-ink outline-none transition-all duration-300 placeholder:text-edn-muted/70 focus:border-edn-bronze"
        {...props}
      />
      <motion.span
        className="pointer-events-none absolute bottom-0 left-5 h-px bronze-line-gradient"
        animate={{ width: focus ? "calc(100% - 2.5rem)" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
};

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", postcode: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onPostcodeChange = (e) =>
    setForm((f) => ({ ...f, postcode: e.target.value.toUpperCase() }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please add your name and email.");
      return;
    }
    if (!form.budget) {
      toast.error("Please select your estimated budget.");
      return;
    }
    if (!form.postcode.trim()) {
      toast.error("Please add your postcode.");
      return;
    }
    if (!form.postcode.trim().toUpperCase().startsWith("EH")) {
      toast.error("We currently only cover Edinburgh (EH) postcodes.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/api/enquiries`, form);
      toast.success("Enquiry sent — we'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", budget: "", postcode: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0">
        <img src={IMAGES.contactBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-edn-warm via-edn-warm/95 to-edn-warm/80" />
        <div className="absolute inset-0 bg-edn-warm/55" />
      </div>

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
            Ready To Transform Your Home?
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl lg:text-6xl">
            Let's Bring Your Vision To Life
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-edn-muted">
            We typically deliver projects between £10,000 and £60,000, while selectively taking on
            larger renovations where the scope aligns with our expertise. Request your free,
            no-obligation quote today.
          </p>
          <div
            data-testid="contact-budget-banner"
            className="mt-6 inline-block rounded-full border border-edn-ink/15 bg-white/60 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-edn-ink"
          >
            We undertake renovations from £10,000 to £60,000
          </div>
          <div className="mt-9 space-y-2 text-sm text-edn-ink/80">
            <div><span className="text-edn-bronze">Call</span> · {CONTACT.phone}</div>
            <div><span className="text-edn-bronze">Email</span> · {CONTACT.email}</div>
            <div><span className="text-edn-bronze">Based in</span> · {CONTACT.location}</div>
          </div>
        </Reveal>

        <Reveal delay={0.15} blur>
          <form
            onSubmit={submit}
            data-testid="enquiry-form"
            className="rounded-[24px] border border-white/60 glass p-8 shadow-[0_30px_80px_rgba(17,17,17,0.16)]"
          >
            <h3 className="font-serif text-2xl text-edn-ink">Get A Free Quote</h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your Name" testid="field-name" value={form.name} onChange={onChange("name")} />
              <Field label="Email Address" testid="field-email" type="email" value={form.email} onChange={onChange("email")} />
            </div>
            <div className="mt-4">
              <Field label="Phone Number" testid="field-phone" value={form.phone} onChange={onChange("phone")} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <select
                  data-testid="field-budget"
                  value={form.budget}
                  onChange={onChange("budget")}
                  className={`w-full appearance-none rounded-2xl border border-edn-divider bg-white/80 px-5 py-4 text-sm outline-none transition-all duration-300 focus:border-edn-bronze ${form.budget ? "text-edn-ink" : "text-edn-muted/70"}`}
                >
                  <option value="" disabled>Estimated Budget</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="text-edn-ink">{b}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-edn-muted" />
              </div>
              <Field
                label="Postcode (EH…)"
                testid="field-postcode"
                value={form.postcode}
                onChange={onPostcodeChange}
                maxLength={8}
              />
            </div>
            <div className="mt-4">
              <Field label="Tell us about your project..." testid="field-message" textarea value={form.message} onChange={onChange("message")} />
            </div>
            <MagneticButton
              type="submit"
              data-testid="enquiry-submit"
              disabled={loading}
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-edn-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_12px_34px_rgba(17,17,17,0.28)] transition-colors duration-300 hover:bg-black disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Enquiry"}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
