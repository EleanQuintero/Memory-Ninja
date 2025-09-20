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

export const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const statsCardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            duration: 0.6
        }
    },
    hover: {
        y: -3,
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};

export const statsNumberVariants: Variants = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.3
        }
    }
};

export const statsIconVariants: Variants = {
    hidden: {
        rotate: -90,
        scale: 0
    },
    visible: {
        rotate: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
        }
    }
};


/*Flashcards Variants Animations*/

/*Container variants*/

export const flashcardContainerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotateX: -10
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 20,
            duration: 0.6,
        }
    },
    hover: {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.8,
        rotateX: -15,
        transition: {
            ease: "easeIn",
            duration: 0.4
        }
    }
};

/*Variantes para flip*/
export const flashcardFlipVariants: Variants = {
    front: {
        rotateY: 0,
        transition: {
            duration: 0.8,
            type: "spring",
            stiffness: 180,
            damping: 22,
        }
    },
    back: {
        rotateY: 180,
        transition: {
            duration: 0.8,
            type: "spring",
            stiffness: 180,
            damping: 22,
        }
    }
};

/* Flashcards Content Variants*/

export const flashcardContentVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.15,
            duration: 0.4,
            ease: "easeOut"
        }
    }
}


/*Botones y feedback visual en interacciones*/

export const flashcardButtonVariants: Variants = {
    idle: {
        scale: 1,
        rotate: 0
    },
    hover: {
        scale: 1.05,
        y: -2,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        }
    },
    tap: {
        scale: 0.98,
        y: 0,
        transition: {
            duration: 0.1,
        }
    }
}


/*Variantes para el boton de eliminar*/
export const deleteButtonVariants: Variants = {
    idle: {
        scale: 1,
        rotate: 0
    },
    hover: {
        scale: 1.1,
        rotate: 90,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        }
    },
    tap: {
        scale: 0.9,
        transition: {
            duration: 0.1,
        }
    },
    deleting: {
        scale: 0.8,
        rotate: 180,
        opacity: 0.6,
        transition: {
            duration: 0.3,
        }
    }
}

/*variantes para la etiqueta de tema de flashcard*/

export const flashcardThemeVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        }
    }
}

/*Variantes para el texto de pregunta/respuesta */
export const flashcardTextVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.5,
            delay: 0.3,
        }
    }
}














