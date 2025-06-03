import { FlashcardResponse } from '@/domain/flashcards'

interface CacheEntry {
    data: FlashcardResponse
    timestamp: number
    version: string
}

export class NativeCacheService {
    private static instance: NativeCacheService
    private readonly CACHE_KEY = 'flashcards-cache'
    private readonly CACHE_VERSION = '1.0.0'
    private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 MINUTOS 

    private constructor() {}

    static getInstance(): NativeCacheService {
        if(!NativeCacheService.instance){
            NativeCacheService.instance = new NativeCacheService()
        }

        return NativeCacheService.instance
    }

    async setCache(user_id: string, data: FlashcardResponse): Promise<void> {
        try {
            const cacheEntry: CacheEntry = {
                data,
                timestamp: Date.now(), // De cara al futuro puede cambiar la API NATIVA
                version: this.CACHE_VERSION 
            }

            const cache = await this.getFullCache()
            cache[user_id] = cacheEntry

            localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache))
            } catch(error) {
                console.error('Error setting cache:', error)
            }
    }

    async getCache(user_id: string): Promise<FlashcardResponse | null> {
        try {
            const cache = await this.getFullCache()
            const entry = cache[user_id]

            if(!entry) return null

            //Verificamos la expiracion
            if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
                await this.clearCache(user_id)
                return null
            }

            return entry.data
        } catch (error) {
            console.error('Error getting cache:', error)
            return null
        }
    }

    private async getFullCache(): Promise<Record<string, CacheEntry>> {
        try {
            const cached = localStorage.getItem(this.CACHE_KEY)
            return cached ? JSON.parse(cached) : {}
        } catch {
            return {}
        }
    }

    async clearCache(user_id: string): Promise<void> {
        try {
            const cache = await this.getFullCache()
            delete cache[user_id]
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache))
        } catch (error) {
            console.error('Error clearing cache: ', error)
            
        }
    }
}