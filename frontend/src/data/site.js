// Centralised content + imagery for EDN Renovation Group
const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const IMAGES = {
  // Authentic Edinburgh architecture — Dean Village, New Town & Old Town
  hero: u("1610991136128-838ca3c5497b", 2400),
  showcase: u("1763133928914-3cb3b2e95cff", 2200),
  processBg: u("1595599014147-a419c147bdc0", 1600),
  contactBg: u("1709531766566-7e26b3ea582d", 2000),
  beforeImg: u("1556909114-f6e7ad7d3136", 1400),
  afterImg: u("1600607687939-ce8a6c25118c", 1400),
};

export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "About Us", id: "showcase" },
  { label: "Process", id: "process" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

export const TRUST = [
  { icon: "Award", value: 15, suffix: "+", label: "Years Experience" },
  { icon: "ShieldCheck", text: "Fully", label: "Insured" },
  { icon: "Star", text: "5★", label: "Rated Service" },
  { icon: "Home", value: 250, suffix: "+", label: "Projects Completed" },
];

export const SERVICES = [
  { title: "Extensions", icon: "Maximize2", img: u("1573558098539-394235f962b3", 1200), desc: "Sympathetic extensions to Edinburgh period homes that expand your living space." },
  { title: "Full Renovations", icon: "Hammer", img: u("1600210492486-724fe5c67fb0", 1200), desc: "Complete home transformations from concept to flawless completion." },
  { title: "Kitchens", icon: "ChefHat", img: u("1556911220-bff31c812dba", 1200), desc: "Bespoke luxury kitchens crafted around how you live and entertain." },
  { title: "Bathrooms", icon: "Bath", img: u("1600566753086-00f18fb6b3ea", 1200), desc: "Spa-grade bathrooms with premium finishes and faultless detail." },
  { title: "Loft Conversions", icon: "Mountain", img: u("1616594039964-ae9021a400a0", 1200), desc: "Light-filled loft spaces that unlock the full potential of your home." },
  { title: "Landscaping", icon: "Trees", img: u("1560448204-e02f11c3d0e2", 1200), desc: "Architectural gardens and outdoor living designed to impress." },
];

export const STATISTICS = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "★", label: "Rated On Google", sub: "(100+ Reviews)" },
];

export const PROCESS = [
  { n: "01", title: "Consultation", icon: "MessageSquare", desc: "We discuss your vision, needs and budget." },
  { n: "02", title: "Design", icon: "PencilRuler", desc: "We create detailed plans and 3D concepts." },
  { n: "03", title: "Planning", icon: "ClipboardCheck", desc: "We handle all approvals and planning." },
  { n: "04", title: "Build", icon: "Hammer", desc: "Expert craftsmanship with full project management." },
  { n: "05", title: "Final Reveal", icon: "Sparkles", desc: "We deliver a flawless finish you'll love." },
];

export const TESTIMONIALS = [
  { name: "Sarah & James T.", text: "EDN Renovation Group transformed our home beyond what we imagined. The attention to detail and quality of work is outstanding." },
  { name: "Michael R.", text: "Professional, reliable and a pleasure to work with. The whole team went above and beyond from start to finish." },
  { name: "Emma L.", text: "We couldn't be happier with our new extension. Exceptional service and craftsmanship throughout." },
];

export const GALLERY = [
  { title: "New Town Kitchen", img: u("1556912172-45b7abe8b7e1", 1100), tall: true },
  { title: "Stockbridge Bathroom", img: u("1600566753151-384129cf4e3e", 1100), tall: false },
  { title: "Dean Village Townhouse", img: u("1610991136128-838ca3c5497b", 1100), tall: false },
  { title: "Morningside Loft", img: u("1616594039964-ae9021a400a0", 1100), tall: true },
  { title: "New Town Drawing Room", img: u("1600210492486-724fe5c67fb0", 1100), tall: false },
  { title: "Royal Mile Apartment", img: u("1709531766566-7e26b3ea582d", 1100), tall: false },
  { title: "Bruntsfield Penthouse", img: u("1600566753190-17f0baa2a6c3", 1100), tall: true },
  { title: "Grange Villa", img: u("1595599014147-a419c147bdc0", 1100), tall: false },
];

export const CONTACT = {
  phone: "0131 526 0140",
  email: "info@ednrenovationgroup.com",
  location: "Edinburgh",
};
