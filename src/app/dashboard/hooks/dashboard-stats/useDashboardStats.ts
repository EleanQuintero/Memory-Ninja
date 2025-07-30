
import { getCountFlashcardsByTheme } from "@/utils/services/functions/api/dashboard/getCountFlashcardByTheme"
import { useQuery } from "@tanstack/react-query"


export const useDashboardStats = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["countFlashcards"],
        queryFn: async () => await getCountFlashcardsByTheme()
    })


    return { data, isLoading }
}