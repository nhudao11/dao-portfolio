export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT, delay: i * 0.06 },
  }),
};
