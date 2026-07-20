// Centralised content + imagery for EDN Renovation Group
const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const IMAGES = {
  // Client-supplied modern kitchen hero (Unsplash: light wood cabinets & island)
  hero: "/hero-kitchen-v2.jpg",
  showcase: u("1763133928914-3cb3b2e95cff", 2200),
  processBg: u("1595599014147-a419c147bdc0", 1600),
  contactBg: u("1709531766566-7e26b3ea582d", 2000),
  beforeImg: "/ba-before.jpg",
  afterImg: "/ba-after.jpg",
  scene1: u("1658370230118-24aa79649d6c", 2200),
  scene2: u("1665507279750-ced2d97a9be9", 2200),
};

export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "About Us", id: "showcase" },
  { label: "Process", id: "process" },
  { label: "Reviews", id: "reviews" },
];

export const TRUST = [
  { icon: "Award", value: 15, suffix: "+", label: "Years Experience" },
  { icon: "ShieldCheck", text: "Fully", label: "Insured" },
  { icon: "Star", text: "5★", label: "Rated Service" },
  { icon: "Home", value: 250, suffix: "+", label: "Projects Completed" },
];

export const SERVICES = [
  { title: "Structural Alterations", icon: "Maximize2", img: u("1760545813135-fbda9423e448", 1200), desc: "Wall removals and steel beam installations to open up and reconfigure your living space." },
  { title: "Full Refurbishments", icon: "Hammer", img: u("1692890658980-1c531c8f682d", 1200), desc: "Complete home transformations from concept to flawless completion." },
  { title: "Kitchens", icon: "ChefHat", img: u("1714860534425-7ce04e013dec", 1200), desc: "Bespoke luxury kitchens crafted around how you live and entertain." },
  { title: "Bathrooms", icon: "Bath", img: u("1661107259637-4e1c55462428", 1200), desc: "Spa-grade bathrooms with premium finishes and faultless detail." },
  { title: "Rewiring", icon: "Zap", img: "https://images.pexels.com/photos/5691493/pexels-photo-5691493.jpeg?auto=compress&cs=tinysrgb&w=1200", desc: "Complete electrical rewires carried out safely, cleanly and fully to current standards." },
  { title: "Heating Systems", icon: "Flame", img: u("1686696037307-2f4cb1c9cf81", 1200), desc: "Full heating system installations and upgrades, delivered safely and to standard." },
];

export const STATISTICS = [
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "★", label: "Rated On Google", sub: "(100+ Reviews)" },
];

export const PROCESS = [
  { n: "1", title: "Initial Phone Consultation", icon: "Phone", desc: "We discuss your project, budget, priorities and rough timescale." },
  { n: "2", title: "Site Visit", icon: "MapPin", desc: "We assess the property, take details and understand the practical requirements." },
  { n: "3", title: "Clear Price", icon: "FileText", desc: "You receive a clear quotation based on the agreed scope of works." },
  { n: "4", title: "Second Site Visit", icon: "ClipboardCheck", desc: "We revisit to run through the quote, refine details, and agree a clear programme before moving forward and agreeing timelines." },
];

export const TESTIMONIALS = [
  { name: "Sarah & James T.", text: "EDN Renovation Group transformed our home beyond what we imagined. The attention to detail and quality of work is outstanding." },
  { name: "Michael R.", text: "Professional, reliable and a pleasure to work with. The whole team went above and beyond from start to finish." },
  { name: "Emma L.", text: "We couldn't be happier with our new extension. Exceptional service and craftsmanship throughout." },
];

export const GALLERY = [
  { title: "New Town Kitchen", img: u("1714860534425-7ce04e013dec", 1100), tall: true },
  { title: "Stockbridge Bathroom", img: u("1661107259637-4e1c55462428", 1100), tall: false },
  { title: "Dean Village Townhouse", img: u("1632143697739-5559b57ac985", 1100), tall: false },
  { title: "Morningside Loft", img: u("1621362660850-a2554b580b41", 1100), tall: true },
  { title: "Royal Mile Heating & Rewire", img: u("1669725341213-7379ff6c90d5", 1100), tall: false },
  { title: "Bruntsfield Sash & Glazing", img: u("1631048498692-af6262577031", 1100), tall: true },
  { title: "Grange Villa Renovation", img: u("1621983209348-7b5a63f23866", 1100), tall: false },
];

export const CONTACT = {
  phone: "0131 510 4760",
  email: "chrisjackson@ednrenovationgroup.com",
  location: "Edinburgh",
};

export const PRICING = {
  eyebrow: "Booking & Payment",
  title: "Transparent booking and payment structure.",
  subtitle:
    "Designed to keep projects organised, dates protected and expectations clear from the start.",
  stages: [
    {
      tab: "Deposit",
      icon: "Bookmark",
      amount: "£100",
      heading: "Booking deposit",
      sub: "£100 to secure your project",
      right: "",
      note: "Booking deposit secures your date in the diary",
    },
    {
      tab: "25%",
      icon: "CircleDollarSign",
      amount: "25%",
      heading: "Before work starts",
      sub: "25% of project cost",
      right: "Paid before work begins",
      note: "Due four weeks prior to works starting",
    },
    {
      tab: "25%",
      icon: "CircleDollarSign",
      amount: "25%",
      heading: "Halfway There",
      sub: "25% of project cost",
      right: "Paid halfway through",
      note: "Due at the halfway stage of the project",
    },
    {
      tab: "Final",
      icon: "CircleDollarSign",
      amount: "50%",
      heading: "At Full Completion",
      sub: "50% of project cost",
      right: "Paid at full completion",
      note: "Final payment only on full completion",
    },
  ],
};
