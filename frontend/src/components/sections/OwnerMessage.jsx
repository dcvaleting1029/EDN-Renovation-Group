import { Reveal } from "@/components/Reveal";

export const OwnerMessage = () => {
  return (
    <section id="owner-message" className="relative overflow-hidden bg-edn-warm py-24 lg:py-32">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-edn-bronze">
          From The Founder
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-4 font-serif text-4xl font-light leading-tight text-edn-ink sm:text-5xl">
          A message from the owner
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <figure className="rounded-[28px] border border-edn-divider/70 bg-white p-8 shadow-[0_20px_70px_rgba(17,17,17,0.06)] sm:p-14" data-testid="owner-message-card">
            <figcaption className="text-center font-serif text-2xl text-edn-ink">
              Chris <span className="text-edn-muted">— Owner</span>
            </figcaption>
            <blockquote className="mx-auto mt-6 max-w-[68ch] text-center text-base leading-[1.9] text-edn-muted sm:text-lg">
              “My mission is simple: to deliver a high-end finish through a well-managed,
              professionally run project. What sets us apart is focus. We run a maximum of two
              projects at any one time. That allows me to stay in control, avoid overstretching,
              and remove the friction and drop in standards that often comes with it. We're not
              chasing volume. We're selective about the work we take on—projects that align with
              our standards and our way of working. Every job is delivered the same way:
              controlled, streamlined, and stress-free.”
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};
