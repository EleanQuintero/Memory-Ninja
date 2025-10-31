import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardToSync, flashcard, getAnswersProps } from "@/domain/flashcards";
import { flashcardUnitOfWork } from "@/utils/services/unitOfWork/flashcardUnitOfWork";

const QUERY_KEY = "flashcards";

export const useFlashCardsQuery = () => {

    const queryClient = useQueryClient();

    const { data: flashcards, isLoading: flashcardLoading, error: flashcardError, isError: flashcardIsError } = useQuery<flashcard[], Error>({
        queryKey: [QUERY_KEY],
        queryFn: async () => await flashcardUnitOfWork.loadUserFlashCards(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    })

    const { mutateAsync: getAnswer } = useMutation({
        mutationFn: async ({ theme, questions, model }: getAnswersProps) => {
            const modelAnswers = await flashcardUnitOfWork.getAnswers({ theme, questions, model })

            return Array.isArray(modelAnswers) ? modelAnswers : [];
        },

        onError: (error: Error) => {
            throw new Error(error.message);
        },
    })

    const { mutate: saveFlashcards, mutateAsync: saveFlashcardsAsync, isPending: isSavingFlashcards, isError: isErrorSaving, error: savingError, isSuccess: flashcardSucces } = useMutation({
        mutationFn: async (flashcardsData: flashcardToSync) => {
            await flashcardUnitOfWork.commitFlashcards(flashcardsData);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });

    const { mutate: deleteFlashcard, isPending: isDeletingFlashcards, isError: isErrorDeleting, error: deletingError } = useMutation({
        mutationFn: async (flashcardID: string) => {
            await flashcardUnitOfWork.deleteFlashcard(flashcardID);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
    });

    return { flashcards, flashcardLoading, flashcardError, flashcardIsError, saveFlashcards, saveFlashcardsAsync, deleteFlashcard, isSavingFlashcards, flashcardSucces, isErrorSaving, savingError, isDeletingFlashcards, isErrorDeleting, deletingError, getAnswer };
};
