declare module "*.css";

declare global {
    interface CustomJwtSessionClaims {
        publicMetadata?: {
            onboarding?: boolean;
            isAdmin?: boolean;
        };
    }
}

export { };