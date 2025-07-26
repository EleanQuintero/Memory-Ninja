import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('debe mostrar el encabezado principal', async ({ page }) => {
        const header = page.getByRole('banner');
        await expect(header).toBeVisible();

        // Verificar logo
        await expect(page.getByAltText(/memory ninja/i)).toBeVisible();

        // Verificar botones de navegación
        await expect(page.getByRole('link', { name: /iniciar sesión/i })).toBeVisible();
    });

    test('debe mostrar la sección Hero con call-to-action', async ({ page }) => {
        const heroSection = page.getByRole('region').filter({ hasText: /potencia tu aprendizaje/i });
        await expect(heroSection).toBeVisible();

        // Verificar botón CTA principal
        const ctaButton = page.getByRole('link', { name: /empezar/i });
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toHaveAttribute('href', '/sign-in');
    });

    test('debe mostrar la sección How It Works', async ({ page }) => {
        const howItWorksSection = page.getByRole('region').filter({ hasText: /cómo funciona/i });
        await expect(howItWorksSection).toBeVisible();

        // Verificar pasos
        const steps = page.locator('.step-card');
        await expect(steps).toHaveCount(3); // Asumiendo que hay 3 pasos
    });

    test('debe mostrar la sección de precios', async ({ page }) => {
        const pricingSection = page.getByRole('region').filter({ hasText: /precios/i });
        await expect(pricingSection).toBeVisible();

        // Verificar planes de precios
        const pricingCards = page.locator('.pricing-card');
        await expect(pricingCards).toHaveCount(2); // Asumiendo que hay 2 planes
    });

    test('debe ser responsive', async ({ page }) => {
        // Prueba en móvil
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page.locator('nav')).toBeVisible();

        // Verificar menú hamburguesa en móvil
        const menuButton = page.getByRole('button', { name: /menú/i });
        await expect(menuButton).toBeVisible();

        // Prueba en tablet
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(page.locator('nav')).toBeVisible();

        // Prueba en desktop
        await page.setViewportSize({ width: 1280, height: 720 });
        await expect(page.locator('nav')).toBeVisible();
    });

    test('debe tener metadatos SEO correctos', async ({ page }) => {
        // Verificar título
        await expect(page).toHaveTitle(/Memory Ninja/);

        // Verificar meta descripción
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('debe tener links funcionales', async ({ page }) => {
        // Verificar que todos los enlaces sean clickeables
        const links = page.getByRole('link');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            await expect(link).toBeVisible();
            await expect(link).toHaveAttribute('href', /.+/);
        }
    });
});
