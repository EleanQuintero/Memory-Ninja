import { Variants } from "motion/react";

/**
 * ============================================
 * ONBOARDING ANIMATIONS - VARIANTS LIBRARY
 * ============================================
 * Biblioteca completa de variants para el flujo de onboarding
 * Incluye: containers, items, badges, buttons, cards y efectos decorativos
 */

/**
 * Variants para el contenedor principal del onboarding
 * Orchestación de todos los elementos con stagger progresivo
 */
export const onboardingContainerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
            when: "beforeChildren"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

/**
 * Variants para items individuales dentro del onboarding
 * Entrada desde abajo con fade y spring physics
 */
export const onboardingItemVariants: Variants = {
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
            mass: 0.8
        }
    }
};

/**
 * Variants para el badge circular (Brain icon container)
 * Entrada con scale bounce y rotate effect
 */
export const onboardingBadgeVariants: Variants = {
    hidden: {
        scale: 0,
        rotate: -180,
        opacity: 0
    },
    visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1
        }
    }
};

/**
 * Variants para títulos principales
 * Entrada dramática con fade desde abajo
 */
export const onboardingTitleVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.2
        }
    }
};

/**
 * Variants para botones principales (CTA)
 * Hover y tap states pronunciados para jerarquía visual
 */
export const onboardingButtonVariants: Variants = {
    idle: {
        scale: 1,
        y: 0
    },
    hover: {
        scale: 1.02,
        y: -2,
        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    },
    tap: {
        scale: 0.98,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 600,
            damping: 35
        }
    }
};

/**
 * Variants para botones secundarios
 * Animaciones más sutiles para mantener balance visual
 */
export const onboardingSecondaryButtonVariants: Variants = {
    idle: {
        scale: 1
    },
    hover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    },
    tap: {
        scale: 0.95,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 30
        }
    }
};

/**
 * Variants para blobs decorativos de fondo
 * Entrada suave con fade
 */
export const onboardingBlobVariants: Variants = {
    hidden: {
        scale: 0.8,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut"
        }
    }
};

/**
 * ============================================
 * CARD ANIMATIONS
 * ============================================
 */

/**
 * Variants para cards del onboarding (Register, Verify, Subscribe)
 * Entrada con scale y fade desde el centro
 */
export const onboardingCardVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 20,
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

/**
 * Variants para contenido dentro de cards
 * Stagger children para entrada progresiva
 */
export const onboardingContentVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 20
        }
    }
};

/**
 * ============================================
 * PROGRESS BAR ANIMATIONS
 * ============================================
 */

/**
 * Variants para el contenedor del progress bar
 */
export const progressContainerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.5
        }
    }
};

/**
 * Variants para el badge de porcentaje
 * Bounce effect al cambiar de valor
 */
export const progressBadgeVariants: Variants = {
    hidden: {
        scale: 1.2,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20
        }
    }
};

/**
 * Variants para mensajes de milestone
 * Entrada suave desde abajo
 */
export const progressMilestoneVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 5
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};

/**
 * ============================================
 * FINISH SCREEN ANIMATIONS
 * ============================================
 */

/**
 * Variants para el contenedor del finish screen
 * Entrada dramática con scale bounce
 */
export const finishContainerVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 20
        }
    }
};

/**
 * Variants para el icono de success (CheckCircle)
 * Entrada con rotate y bounce
 */
export const finishSuccessIconVariants: Variants = {
    hidden: {
        scale: 0,
        rotate: -180,
        opacity: 0
    },
    visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
        }
    }
};

/**
 * Variants para elementos de texto en finish screen
 * Entrada secuencial con delays incrementales
 */
export const finishTextVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

/**
 * ============================================
 * CONFETTI ANIMATIONS
 * ============================================
 */

/**
 * Función helper para generar animación de confetti
 * Retorna configuración de animate para partículas individuales
 */
export const getConfettiAnimation = (index: number) => {
    const angle = (index * 360) / 50;
    const radius = 200 + Math.random() * 100;

    return {
        y: [0, -radius * Math.sin((angle * Math.PI) / 180), radius * 2],
        x: [0, radius * Math.cos((angle * Math.PI) / 180), 0],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1), 720],
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
        transition: {
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.02,
            ease: "easeOut",
            repeatDelay: 1
        }
    };
};

/**
 * ============================================
 * ACCESSIBLE VARIANTS (Reduced Motion)
 * ============================================
 */

/**
 * Variants accesibles para container
 * Versión simplificada con solo fade
 */
export const accessibleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    },
    exit: { opacity: 0, transition: { duration: 0.01 } }
};

/**
 * Variants accesibles para items
 */
export const accessibleItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    }
};

/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Helper function para obtener variants con soporte de reduced motion
 * @param normalVariants - Variants normales con animaciones completas
 * @param accessibleVariants - Variants simplificados para reduced motion
 * @param shouldReduceMotion - Flag de preferencia del usuario
 */
export const getAdaptiveVariants = (
    normalVariants: Variants,
    accessibleVariants: Variants,
    shouldReduceMotion: boolean
): Variants => {
    return shouldReduceMotion ? accessibleVariants : normalVariants;
};

/**
 * Helper function para generar delay incremental en listas
 * Útil para stagger manual de elementos
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0, increment: number = 0.1): number => {
    return baseDelay + (index * increment);
};

/**
 * ============================================
 * ANIMATION CONFIGS - CONSTANTS
 * ============================================
 */

/**
 * Constantes de timing recomendadas para consistencia
 */
export const ONBOARDING_TIMINGS = {
    microInteraction: 0.15,      // Hover, tap states
    componentTransition: 0.4,    // Entrada/salida de componentes
    pageTransition: 0.5,         // Transiciones entre pasos
    blobAnimation: 20,           // Duración de blobs decorativos
    confettiDuration: 3,         // Duración de confetti individual
    staggerDelay: 0.12,          // Delay entre children en stagger
    delayChildren: 0.15          // Delay inicial antes de stagger
} as const;

/**
 * Spring configurations predefinidas
 */
export const ONBOARDING_SPRINGS = {
    gentle: { stiffness: 100, damping: 20, mass: 0.8 },
    bouncy: { stiffness: 200, damping: 15 },
    snappy: { stiffness: 400, damping: 25 },
    responsive: { stiffness: 600, damping: 35 }
} as const;
