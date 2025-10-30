import { themes } from "@/domain/themes";
import { createUserTheme } from "@/utils/services/functions/api/themes/createUserTheme";
import { deleteUserThemes } from "@/utils/services/functions/api/themes/deleteUserTheme";
import { getThemeStatus } from "@/utils/services/functions/api/themes/getThemeStatus";
import { getUserThemes } from "@/utils/services/functions/api/themes/getUserThemes";
import { updateThemeStatus } from "@/utils/services/functions/api/themes/updateThemeStatus";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useThemeStore } from "../../generate/components/theme-selector/store/interestThemes";


const QUERY_KEY = "themes"

export const useThemeQuerys = () => {

    const queryClient = useQueryClient();

    const { selectedTheme, setSelectedTheme } = useThemeStore()

    const { data: themes, isLoading: isLoadingThemes, error: themesError, isError: themeIsError } = useQuery<themes[], Error>({
        queryKey: [QUERY_KEY],
        queryFn: async () => await getUserThemes(),
        staleTime: 60 * 60 * 1000, // 60 minutes
        gcTime: 60 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    });

    const { data: theme_status, isLoading: isLoadingStatus } = useQuery<boolean, Error>({
        queryKey: ["theme-status"],
        queryFn: async () => await getThemeStatus(),
        staleTime: 60 * 60 * 1000, // 60 minutes
        gcTime: 60 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    });

    const { mutate: updateStatus } = useMutation({
        mutationFn: async () => {
            await updateThemeStatus();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["theme-status"] });
        },
    });

    const { mutate: deleteTheme, isPending: isDeleting } = useMutation({
        mutationFn: async (themeID: number) => {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            await deleteUserThemes(themeID);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });




    const { mutate: createTheme, error: createThemeError, isError: isCreateThemeError, isPending: isCreatingTheme } = useMutation({
        mutationFn: async (themeName: string) => {
            // Simulate a delay to show the loading modal
            await new Promise((resolve) => setTimeout(resolve, 1200));
            await createUserTheme(themeName);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });


    return {
        themes,
        isLoadingThemes,
        themesError,
        themeIsError,
        deleteTheme,
        createTheme,
        createThemeError,
        isCreateThemeError,
        isCreatingTheme,
        theme_status,
        updateStatus,
        isLoadingStatus,
        selectedTheme,
        setSelectedTheme,
        isDeleting,
    };

}