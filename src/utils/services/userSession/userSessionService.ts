interface UserSessionInfo {
    user_id: string, 
    lastLogin: number
}

export class UserSessionService {
    private static instance: UserSessionService
    private readonly USER_SESSION_KEY = 'current-user-session'
    private readonly OLD_STORE_KEY = 'flashcard-buffer'

    private constructor() {}

    static getInstance(): UserSessionService {
        if(!UserSessionService.instance) {
            UserSessionService.instance = new UserSessionService()
        }

        return UserSessionService.instance
    }

    //Obtiene informacion del usuario actual
    getCurrentUserSession(): UserSessionInfo | null {
        try {
            const sessionData = localStorage.getItem(this.USER_SESSION_KEY)
            return sessionData ? JSON.parse(sessionData) : null
        } catch (error) {
            console.error('Error al obtener sesion de usuario:', error)
            return null
        }
    }

    //Actualiza la informacion de la sesion
    updateUserSession(user_id:string): void {
        try {
            const sessionInfo: UserSessionInfo = {
                user_id,
                lastLogin: Date.now() // => en un futuro puede cambiar la api DATE
            }
            localStorage.setItem(this.USER_SESSION_KEY, JSON.stringify(sessionInfo))
        } catch (error) {
            console.error('Error al actualizar sesion de usuario:', error)
            
        }
    }

    //Verifica si ha cambiado el usuario
    hasUserChanged(newUserId: string): boolean {
        const currentSession = this.getCurrentUserSession()
        return currentSession?.user_id !== newUserId
    }
    
    //Limpieza de datos del usuario anterior
    async cleanupPreviousUserData(previousUserId: string): Promise<void>{
        try {
            //Limpiamos cache del usuario anterior
            const { NativeCacheService } = await import('../cache/nativeCacheService')
            const cacheService = NativeCacheService.getInstance()
            await cacheService.clearCache(previousUserId)

            //Limpiamos el store antiguo
            localStorage.removeItem(this.OLD_STORE_KEY)

            console.log(`Datos del usuario ${previousUserId} limpiados correctamente`)
        } catch (error) {
            console.error('Error al limpiar los datos del usuario anterior:', error)
        }
    }

    getPreviousUserId(): string | null {
        const currentSession = this.getCurrentUserSession();
        return currentSession?.user_id || null;
    }
}