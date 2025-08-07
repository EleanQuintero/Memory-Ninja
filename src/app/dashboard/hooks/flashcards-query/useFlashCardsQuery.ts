import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardToSync, flashcard } from "@/domain/flashcards";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";
export const useFlashCardsQuery = () => {
    const QUERY_KEY = "flashcards";

    const queryClient = useQueryClient();

    const { data, isLoading, error, isError } = useQuery<flashcard[], Error>({
        queryKey: [QUERY_KEY],
        queryFn: async () => await flashcardUnitOfWork.loadUserFlashCards(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    });

    const { mutate: saveFlashcards } = useMutation({
        mutationFn: async (flashcardsData: flashcardToSync) => {
            await flashcardUnitOfWork.commitFlashcards(flashcardsData);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });

    const { mutate: deleteFlashcard } = useMutation({
        mutationFn: async (flashcardID: string) => {
            await flashcardUnitOfWork.deleteFlashcard(flashcardID);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });

    return { flashcards: data, isLoading, error, isError, saveFlashcards, deleteFlashcard };
};
