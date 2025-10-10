import { Variants } from "motion/react"
import { useReducedMotion } from '@/animations/hooks/useReducedMotion';


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

/**
 * Variantes base para botones - Configuración común
 * Proporciona animaciones suaves y consistentes para todos los tipos de botón
 */
export const baseButtonVariants: Variants = {
    idle: {
        scale: 1,
        y: 0,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    disabled: {
        scale: 0.98,
        opacity: 0.6,
        cursor: "not-allowed",
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
};

/**
 * Variantes para botones primarios
 * Animaciones más prominentes para reforzar jerarquía visual
 */
export const primaryButtonVariants: Variants = {
    ...baseButtonVariants,
    hover: {
        scale: 1.02,
        y: -2,
        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3
        }
    },
    tap: {
        scale: 0.98,
        y: 0,
        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
        transition: {
            type: "spring",
            stiffness: 600,
            damping: 35,
            duration: 0.1
        }
    },
    loading: {
        scale: 0.98,
        opacity: 0.8,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para botones secundarios
 * Animaciones moderadas para mantener balance visual
 */
export const secondaryButtonVariants: Variants = {
    ...baseButtonVariants,
    hover: {
        scale: 1.01,
        y: -1,
        boxShadow: "0 4px 12px rgba(107, 114, 128, 0.3)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
        }
    },
    tap: {
        scale: 0.99,
        y: 0,
        boxShadow: "0 1px 4px rgba(107, 114, 128, 0.2)",
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 35,
            duration: 0.1
        }
    },
    loading: {
        scale: 0.99,
        opacity: 0.8,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para botones outline
 * Animaciones sutiles que complementan el estilo minimalista
 */
export const outlineButtonVariants: Variants = {
    ...baseButtonVariants,
    idle: {
        scale: 1,
        y: 0,
        borderWidth: "1px",
        boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)"
    },
    hover: {
        scale: 1.01,
        y: -1,
        borderWidth: "2px",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 30,
            duration: 0.25
        }
    },
    tap: {
        scale: 0.99,
        y: 0,
        borderWidth: "1px",
        boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 35,
            duration: 0.1
        }
    },
    loading: {
        scale: 0.99,
        opacity: 0.7,
        borderWidth: "1px",
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para botones ghost
 * Animaciones minimalistas para no interferir con el contenido
 */
export const ghostButtonVariants: Variants = {
    ...baseButtonVariants,
    idle: {
        scale: 1,
        y: 0,
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)"
    },
    hover: {
        scale: 1.005,
        y: 0,
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 35,
            duration: 0.2
        }
    },
    tap: {
        scale: 0.995,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.1
        }
    },
    loading: {
        scale: 0.995,
        opacity: 0.7,
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para botones destructivos (delete, remove, etc.)
 * Animaciones que comunican la naturaleza crítica de la acción
 */
export const destructiveButtonVariants: Variants = {
    ...baseButtonVariants,
    hover: {
        scale: 1.02,
        y: -2,
        boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
        transition: {
            type: "spring",
            stiffness: 350,
            damping: 25,
            duration: 0.3
        }
    },
    tap: {
        scale: 0.98,
        y: 0,
        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 35,
            duration: 0.1
        }
    },
    loading: {
        scale: 0.98,
        opacity: 0.8,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

/**
 * Variantes para iconos dentro de botones
 * Micro-animaciones que añaden dinamismo sin ser distractivas
 */
export const buttonIconVariants: Variants = {
    idle: {
        rotate: 0,
        scale: 1
    },
    hover: {
        rotate: [0, -5, 5, 0],
        scale: 1.1,
        transition: {
            duration: 0.4,
            ease: "easeInOut"
        }
    },
    tap: {
        scale: 0.9,
        transition: {
            duration: 0.1,
            ease: "easeOut"
        }
    }
};

/**
 * Variantes para texto de botones con efecto de loading
 * Transiciones suaves entre estados de texto
 */
export const buttonTextVariants: Variants = {
    idle: {
        opacity: 1,
        y: 0
    },
    loading: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

/**
 * Mapeo de tipos de botón a sus variants correspondientes
 * Facilita la selección dinámica de variants en los componentes
 */
export const buttonVariantsMap = {
    primary: primaryButtonVariants,
    secondary: secondaryButtonVariants,
    outline: outlineButtonVariants,
    ghost: ghostButtonVariants,
    destructive: destructiveButtonVariants,
    default: secondaryButtonVariants
} as const;

/**
 * Tipos TypeScript para el mapeo de variants
 */
export type ButtonVariantType = keyof typeof buttonVariantsMap;


export const headerVariants: Variants = {
    hidden: {
        y: -100,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const menuItemVariants: Variants = {
    hidden: {
        x: -20,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    }
};

export const sidebarVariants: Variants = {
    expanded: {
        width: "16rem",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.05
        }
    },
    collapsed: {
        width: "3rem",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

export const sidebarItemVariants: Variants = {
    expanded: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    collapsed: {
        opacity: 0,
        x: -10,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    }
};

// Animaciones de entrada para mobile
export const mobileMenuVariants: Variants = {
    closed: {
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    open: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    }
};

/*Accesibilidad*/

export const getAccessibleTransition = (shouldReduceMotion: boolean) => ({
    type: shouldReduceMotion ? ("tween" as const) : ("spring" as const),
    duration: shouldReduceMotion ? 0.01 : 0.3,
    stiffness: shouldReduceMotion ? 0 : 300,
    damping: shouldReduceMotion ? 0 : 30,
    ease: shouldReduceMotion ? "linear" as const : "easeOut" as const
});

export const getAccessibleVariants = (variants: Variants, shouldReduceMotion: boolean): Variants => {
    if (!shouldReduceMotion) return variants;

    const accessibleVariants: Variants = {};

    Object.keys(variants).forEach(key => {
        const variant = variants[key];

        if (typeof variant === 'object' && variant !== null && !Array.isArray(variant)) {
            // Para animaciones de entrada/salida, usar solo opacity
            if (key === 'hidden') {
                accessibleVariants[key] = {
                    opacity: 0,
                    transition: { duration: 0.01, type: "tween" }
                };
            } else if (key === 'visible') {
                accessibleVariants[key] = {
                    opacity: 1,
                    transition: { duration: 0.01, type: "tween" }
                };
            } else {
                // Para otros estados, mantener solo opacity y scale si existe
                accessibleVariants[key] = {
                    opacity: variant.opacity ?? 1,
                    scale: variant.scale ?? 1,
                    transition: { duration: 0.01, type: "tween" }
                };
            }
        } else {
            // Si no es un objeto, mantener el valor original
            accessibleVariants[key] = variant;
        }
    });

    return accessibleVariants;
};

export const useAccessibleVariants = (variants: Variants) => {
    const shouldReduceMotion = useReducedMotion();
    return getAccessibleVariants(variants, shouldReduceMotion);
};


/**
 * Variants accesibles específicos para navegación
 * Proporcionan fallbacks seguros para usuarios con preferencias de reduced motion
 */
export const accessibleHeaderVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.01,
            type: "tween"
        }
    }
};

export const accessibleSidebarVariants: Variants = {
    expanded: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    },
    collapsed: {
        opacity: 0.7,
        transition: { duration: 0.01, type: "tween" }
    }
};

export const accessibleMenuItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    }
};

/**
 * ============================================
 * SIDEBAR & NAVIGATION ANIMATIONS - FASE 4
 * ============================================
 * Implementación completa de animaciones para sidebar del dashboard
 * Incluye: menu items, iconos, UserButton, transiciones y page transitions
 */

/**
 * Variants para el contenedor del sidebar menu
 * Orchestación de animaciones de menu items con stagger
 */
export const sidebarMenuContainerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
            when: "beforeChildren"
        }
    }
};

/**
 * Variants individuales para cada menu item
 * Entrada desde la izquierda con fade y escala sutil
 */
export const sidebarMenuItemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -15,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8
        }
    }
};

/**
 * Variants para iconos de menu
 * Micro-animaciones en hover para feedback visual
 */
export const sidebarIconVariants: Variants = {
    idle: {
        scale: 1,
        rotate: 0
    },
    hover: {
        scale: 1.1,
        rotate: [0, -8, 8, 0],
        transition: {
            duration: 0.4,
            ease: "easeInOut"
        }
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1
        }
    }
};

/**
 * Variants para el UserButton
 * Entrada especial con bounce effect
 */
export const userButtonVariants: Variants = {
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.2
        }
    }
};

/**
 * Variants para el sidebar completo (desktop)
 * Transiciones suaves entre estados collapsed/expanded
 */
export const sidebarContainerVariants: Variants = {
    expanded: {
        width: "16rem",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4
        }
    },
    collapsed: {
        width: "3rem",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4
        }
    }
};

/**
 * Variants para entrada/salida del sidebar mobile
 * Animación desde el lateral con fade
 */
export const sidebarMobileVariants: Variants = {
    hidden: {
        x: "-100%",
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
        }
    },
    exit: {
        x: "-100%",
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
        }
    }
};

/**
 * Variants para el SidebarTrigger (botón toggle)
 * Rotación del icono según estado + hover/tap feedback
 */
export const sidebarTriggerIconVariants: Variants = {
    expanded: {
        rotate: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    collapsed: {
        rotate: 180,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

/**
 * Variants para texto de menu items en collapsed state
 * Fade in/out suave con ajuste de ancho
 */
export const sidebarMenuTextVariants: Variants = {
    hidden: {
        opacity: 0,
        width: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    visible: {
        opacity: 1,
        width: "auto",
        transition: {
            duration: 0.2,
            ease: "easeIn",
            delay: 0.1
        }
    }
};

/**
 * ============================================
 * PAGE TRANSITIONS - NAVIGATION
 * ============================================
 * Transiciones entre páginas del dashboard para continuidad visual
 */

/**
 * Variants para transiciones de página
 * Entrada/salida con fade + movimiento vertical sutil
 */
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // Material Design easing
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1]
        }
    }
};

/**
 * Variants para contenido de página
 * Stagger de elementos internos para entrada progresiva
 */
export const pageContentVariants: Variants = {
    initial: {
        opacity: 0,
        y: 10
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

/**
 * Variants accesibles para sidebar
 * Versión simplificada para usuarios con prefer-reduced-motion
 */
export const accessibleSidebarContainerVariants: Variants = {
    expanded: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    },
    collapsed: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    }
};

/**
 * Variants accesibles para page transitions
 * Solo fade simple sin movimiento
 */
export const accessiblePageVariants: Variants = {
    initial: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: { duration: 0.01, type: "tween" }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.01, type: "tween" }
    }
};














