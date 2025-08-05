import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { flashcardToSync, flashcard } from '@/domain/flashcards';
import { flashcardUnitOfWork } from '@/utils/services/unitOfWork/flashcardUnitOfWork';

export const useFlashCardsQuery = (user_id: string) => {

    const QUERY_KEY = 'flashcards';

    const queryClient = useQueryClient()

    const { data, isLoading, error, isError } = useQuery<flashcard[], Error>({
        queryKey: [QUERY_KEY],
        queryFn: () => flashcardUnitOfWork.loadUserFlashCards(user_id),
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 3,
    })

    return { flashcards: data, isLoading, error, isError };





}