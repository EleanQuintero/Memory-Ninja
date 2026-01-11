export { };

declare global {
    interface UserPublicMetadata {
        demoUser?: boolean;
        role?: string;
        subscription?: string;
    }
}
