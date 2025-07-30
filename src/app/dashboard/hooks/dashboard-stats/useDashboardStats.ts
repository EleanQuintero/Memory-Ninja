import { getCountFlashcardsByTheme } from "@/utils/services/functions/api/dashboard/getCountFlashcardByTheme"
import { getLatestFlashcardsCreated } from "@/utils/services/functions/api/dashboard/getLastestFlashcardsCreated"
import { useQueries } from "@tanstack/react-query"


export const useDashboardStats = () => {

    const queries = useQueries({
        queries: [
            {
                queryKey: ["countFlashcards"],
                queryFn: async () => await getCountFlashcardsByTheme()
            },
            {
                queryKey: ["latestFlashcards"],
                queryFn: async () => await getLatestFlashcardsCreated()
            }
        ]
    })

    const [countedFlashcards, latestFlashcards] = queries

    //Loading states 
    const isLoading = queries.some(query => query.isLoading)

    //Error validation
    const hasErrors = queries.some(query => query.error)

    //Data export
    const dashboardStats = {
        countedFlashcardsData: countedFlashcards.data,
        latestFlashcardsData: latestFlashcards.data,
        isLoading,
        hasErrors,
        errors: queries.map(query => query.error)
    }


    return { dashboardStats }
}