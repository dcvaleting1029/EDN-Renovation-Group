// Smooth-scroll aware navigation. Uses Lenis when available, else native.
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4, offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
};
