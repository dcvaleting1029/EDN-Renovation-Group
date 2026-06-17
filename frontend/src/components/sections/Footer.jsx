import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/data/site";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1480px] px-6 py-14 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <div className="font-serif text-3xl font-light tracking-[0.22em] text-edn-bronze">EDN</div>
            <div className="mt-1 text-[9px] tracking-[0.4em] text-edn-muted">RENOVATION GROUP</div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-edn-muted">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 transition-colors hover:text-edn-bronze" data-testid="footer-phone">
              <Phone size={14} /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-edn-bronze" data-testid="footer-email">
              <Mail size={14} /> {CONTACT.email}
            </a>
            <span className="flex items-center gap-2"><MapPin size={14} /> {CONTACT.location}</span>
          </div>

          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-edn-divider text-edn-muted transition-all duration-300 hover:border-edn-bronze hover:text-edn-bronze" data-testid={`footer-social-${i}`}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="my-10 h-px w-full bg-edn-divider" />

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="text-[10px] font-medium uppercase tracking-[0.18em] text-edn-muted transition-colors hover:text-edn-ink"
                  data-testid={`footer-nav-${l.id}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.18em] text-edn-muted">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-edn-muted/70 lg:text-left">
          © {new Date().getFullYear()} EDN Renovation Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
