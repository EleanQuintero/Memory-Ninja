declare global {
    interface CustomJwtSessionClaims {
        publicMetadata?: {
            onboarding?: boolean;
        };
    }
}

export { };