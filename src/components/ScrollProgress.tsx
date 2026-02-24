import React from 'react';
import { motion, useScroll } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
