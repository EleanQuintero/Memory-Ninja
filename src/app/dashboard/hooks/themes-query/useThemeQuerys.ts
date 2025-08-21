import { themes } from "@/domain/themes";
import { createUserTheme } from "@/utils/services/functions/api/themes/createUserTheme";
import { deleteUserThemes } from "@/utils/services/functions/api/themes/deleteUserTheme";
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

    const { mutate: deleteTheme } = useMutation({
        mutationFn: async (themeID: number) => {
            await deleteUserThemes(themeID);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });

    const { mutate: createTheme } = useMutation({
        mutationFn: async (themeName: string) => {
            await createUserTheme(themeName);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });


    return { themes, isLoadingThemes, themesError, themeIsError, deleteTheme, createTheme };

}