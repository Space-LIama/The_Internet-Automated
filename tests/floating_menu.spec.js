const { test, expect } = require("@playwright/test");

test.describe("Floating menu page tests", () => {
  test.beforeEach("Go to the floating menu page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Floating" });
    await link.click();
  });

  test("Floating menu is visible before scroll", async ({ page }) => {
    const menu = page.locator("#menu");
    await expect(menu).toBeVisible();
  });

  test("Floating menu is visible after scroll", async ({ page }) => {
    const menu = page.locator("#menu");
    await page.mouse.wheel(0, 500); // scrolling 500 px down
    await expect(menu).toBeVisible();
  });
});
