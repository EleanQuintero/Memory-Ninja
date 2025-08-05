import { FlashcardRepository } from "@/infrastructure/flashcardRepository";
import { useFlashCardsStore } from "@/app/dashboard/flashcards/store/flashCardsStore";
import { NativeCacheService } from "../cache/nativeCacheService";
import { AnswerData, flashcard, getAnswersProps } from "@/domain/flashcards";
import { UserSessionService } from "../userSession/userSessionService";

export class FlashcardUnitOfWork {
  private readonly repository: FlashcardRepository;
  private readonly cacheService: NativeCacheService;
  private readonly userSessionService: UserSessionService;
  private static instance: FlashcardUnitOfWork;

  private constructor() {
    this.repository = new FlashcardRepository();
    this.cacheService = NativeCacheService.getInstance();
    this.userSessionService = UserSessionService.getInstance();
  }

  public static getInstance(): FlashcardUnitOfWork {
    if (!FlashcardUnitOfWork.instance) {
      FlashcardUnitOfWork.instance = new FlashcardUnitOfWork();
    }
    return FlashcardUnitOfWork.instance;
  }

  private async _handleUserChange(newUserId: string): Promise<void> {
    if (this.userSessionService.hasUserChanged(newUserId)) {
      const previousUserId = this.userSessionService.getPreviousUserId();

      if (previousUserId) {
        // Limpiamos el estado del store
        useFlashCardsStore.getState().clearAllData();

        // Limpiar datos del usuario anterior
        await this.userSessionService.cleanupPreviousUserData(previousUserId);
      }

      // Actualizamos sesión del nuevo usuario
      this.userSessionService.updateUserSession(newUserId);
    }
  }

  public async commit(userId: string): Promise<void> {
    const state = useFlashCardsStore.getState();

    if (!state.isDirty) return; // No hay cambios para sincronizar

    // Obtenemos las nuevas flashcards
    const newFlashCards = state.getNewFlashcardsForSync(userId);

    if (newFlashCards.flashcard.length === 0) return; // Nada que sincronizar

    try {
      await this.repository.saveFlashcards(newFlashCards);
      state.markAsSynced();
    } catch (error) {
      console.error("Error durante la sincronización:", error);
      state.markAsSynced();
      throw error;
    }
  }

  public async loadUserFlashCards(userId: string): Promise<flashcard[]> {
    await this._handleUserChange(userId);
    // Si no hay cache, cargar desde la API
    const flashcards = await this.repository.getAllFlashcards(userId);
    return flashcards;
  }

  public async getAnswers({ theme, userLevel, questions }: getAnswersProps): Promise<AnswerData> {
    try {
      return await this.repository.getModelAnswer({ theme, userLevel, questions });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido al obtener respuestas");
    }
  }

  public async deleteFlashcard(userId: string, id: string): Promise<void> {
    try {
      return await this.repository.deleteFlashcard(userId, id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido al eliminar flashcard");
    }
  }
}

// Exportar una instancia para mantener compatibilidad con el código existente
export const flashcardUnitOfWork = FlashcardUnitOfWork.getInstance();

