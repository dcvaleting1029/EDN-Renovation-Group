import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left bronze-line-gradient"
      style={{ scaleX }}
    />
  );
};
