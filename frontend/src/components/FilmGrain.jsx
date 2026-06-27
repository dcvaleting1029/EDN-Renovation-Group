// Subtle cinematic film grain + vignette overlay (global, non-interactive)
export const FilmGrain = () => (
  <>
    <div className="film-grain pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
    <div className="film-vignette pointer-events-none fixed inset-0 z-[55]" aria-hidden="true" />
  </>
);
