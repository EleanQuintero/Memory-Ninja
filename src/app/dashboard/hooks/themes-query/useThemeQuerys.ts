import { themes } from "@/domain/themes";
import { getUserThemes } from "@/utils/services/functions/api/themes/getUserThemes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



export const useThemeQuerys = () => {
    const QUERY_KEY = "themes"

    const queryClient = useQueryClient();

    const { data: themes, isLoading: isLoadingThemes, error: themesError, isError: themeIsError } = useQuery<themes[], Error>({
        queryKey: [QUERY_KEY],
        queryFn: async () => await getUserThemes(),
        staleTime: 60 * 60 * 1000, // 60 minutes
        gcTime: 60 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    });


    return { themes, isLoadingThemes, themesError, themeIsError };

}