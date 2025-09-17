import { Variants } from "framer-motion"


/*Variantes para contenedores*/

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    },
};


/*Variantes para items que aparecen desde abajo*/

export const fadeInUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
        }
    },
};

/*Variantes para elementos que aparecen desde la izquierda*/

export const slideInLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        }
    },
};


/*Variantes para elementos que aparecen desde la derecha*/

export const slideInRightVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        }
    },
};

/*Variantes para contadores o numeros animados*/

export const counterVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
        }
    },
}

/* Variantes para el dashboard */

export const dashboardCardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6,
        }
    },
    hover: {
        scale: 1.02,
        y: -5,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    }
}

/*Variantes para elementos de loading*/

export const spinnerVariants: Variants = {
    hidden: {
        opacity: 0,
        rotate: 0,

    },
    visible: {
        opacity: 1,
        rotate: 360,
        transition: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
        }
    }
}

/**
 * Variantes para elementos que pulsan
 * Útil para llamar la atención del usuario
 */
export const pulseVariants: Variants = {
    hidden: {
        scale: 1,
        opacity: 1,
    },
    visible: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para elementos que aparecen con fade simple
 * Transición básica de opacidad
 */
export const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

/**
 * Variantes para elementos que aparecen con scale
 * Útil para modales y overlays
 */
export const scaleVariants: Variants = {
    hidden: {
        scale: 0.8,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    }
};













