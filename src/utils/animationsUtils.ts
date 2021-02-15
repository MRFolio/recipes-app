// page animations
export const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
};

export const pageTransition = {
  transition: 'tween',
  ease: 'anticipate',
  duration: 0.9,
};

// paragraph animations
export const paragraphVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export const paragraphTransition = {
  transition: 'tween',
  ease: 'anticipate',
  duration: 0.65,
};

// favorite animation
export const favoriteVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

// categories animation
export const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const element1Variant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};
export const element2Variant = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

export const transitionItems = {
  transition: 'tween',
  ease: 'anticipate',
  duration: 0.7,
};

// ingredient animation (listItems)
export const delayVariants = {
  hidden: { opacity: 0, scale: 0.2, y: -75, x: 75 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.25 + index * 0.16,
      duration: 0.7,
      ease: 'circOut',
    },
  }),
};

export const delayVariantsFaster = {
  hidden: { opacity: 0, scale: 0.2, y: -75, x: 75 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.25 + index * 0.08,
      duration: 0.7,
      ease: 'circOut',
    },
  }),
};
