import { useEffect } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -34 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="font-serif text-5xl font-light tracking-[0.3em] text-edn-ink">
          EDN
        </div>
        <div className="mt-1 text-[10px] tracking-[0.42em] text-edn-muted">
          RENOVATION GROUP
        </div>
      </motion.div>

      <motion.div
        className="mt-7 h-[2px] bronze-line-gradient"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 200, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </motion.div>
  );
};
