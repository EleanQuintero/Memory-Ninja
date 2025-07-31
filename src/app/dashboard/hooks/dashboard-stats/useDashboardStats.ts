import { getCountFlashcardsByTheme } from "@/utils/services/functions/api/dashboard/getCountFlashcardByTheme"
import { getLatestFlashcardsCreated } from "@/utils/services/functions/api/dashboard/getLastestFlashcardsCreated"
import { getThemeWithMaxFlashcards } from "@/utils/services/functions/api/dashboard/getThemeWithMaxFlashcards"
import { useQueries } from "@tanstack/react-query"


export const useDashboardStats = () => {

    const commonQueryOptions = {
        refetchInterval: 60000, // 60 segundos
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchIntervalInBackground: false,
        staleTime: 60000, // 60 segundos
        gcTime: 300000, // 5 minutos
        retry: 3,
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }


    const queries = useQueries({
        queries: [
            {
                queryKey: ["countFlashcards"],
                queryFn: async () => await getCountFlashcardsByTheme(),
                ...commonQueryOptions
            },
            {
                queryKey: ["latestFlashcards"],
                queryFn: async () => await getLatestFlashcardsCreated(),
                ...commonQueryOptions
            },
            {
                queryKey: ["themeWithMaxFlashcards"],
                queryFn: async () => await getThemeWithMaxFlashcards(),
                ...commonQueryOptions
            }
        ]
    })

    const [countFlashcards, latestFlashcards, themeWithMaxFlashcards] = queries

    //Loading states 
    const isLoading = queries.some(query => query.isLoading)

    //Error validation
    const hasErrors = queries.some(query => query.error)

    //Data export
    const dashboardStats = {
        countedFlashcardsData: countFlashcards.data,
        latestFlashcardsData: latestFlashcards.data,
        themeWithMaxFlashcardsData: themeWithMaxFlashcards.data,

        isLoading,
        hasErrors,
        errors: queries.map(query => query.error)
    }


    return { dashboardStats }
}