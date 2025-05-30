import { type Variants } from 'framer-motion';

export const slideVariants: Variants = {
  initial: (direction: number) => ({
    y: direction === 1 ? 30 : (direction === -1 ? -30 : 0),
    opacity: 0,
    scale: 0.98,
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }, // Smoother cubic-bezier
  },
  exit: (direction: number) => ({
    y: direction === 1 ? -30 : (direction === -1 ? 30 : 0),
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  }),
};

export const pageTransitionVariants: Variants = {
  initial: {
    x: '100vw',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', ease: 'circOut', duration: 0.5 },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: { type: 'tween', ease: 'circIn', duration: 0.3 },
  },
};