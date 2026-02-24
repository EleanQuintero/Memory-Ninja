export const FREE_LIMITS = {
  maxFlashcards: 25,
  maxThemes: 2,
  maxDailyGenerations: 3,
  allowedModels: ["Kōga (甲賀)"],
  maxVisibleRecentCards: 5,
} as const;

export const PRO_LIMITS = {
  maxFlashcards: Infinity,
  maxThemes: Infinity,
  maxDailyGenerations: Infinity,
  allowedModels: ["Kōga (甲賀)", "Kurayami (暗闇)"],
  maxVisibleRecentCards: Infinity,
} as const;
