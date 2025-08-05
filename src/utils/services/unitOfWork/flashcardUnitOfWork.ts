import { FlashcardRepository } from "@/infrastructure/flashcardRepository";
import { NativeCacheService } from "../cache/nativeCacheService";
import { AnswerData, flashcard, flashcardToSync, getAnswersProps } from "@/domain/flashcards";
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

  public async commitFlashcards(flashcardsData: flashcardToSync): Promise<void> {
    try {
      await this.repository.saveFlashcards(flashcardsData);
    } catch (error) {
      console.error("Error durante la sincronización:");
      throw error;
    }
  }

  public async loadUserFlashCards(): Promise<flashcard[]> {
    try {
      const flashcards = await this.repository.getAllFlashcards();
      return flashcards;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido al cargar las flashcards");
    }
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

