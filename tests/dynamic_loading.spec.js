const { test, expect } = require("@playwright/test");

test.describe("Dynamic loading page tests", () => {
  test.beforeEach("Go to the dynamic loading page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Dynamic Loading" });
    await link.click();
  });

  test("Dynamic loading page test", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Dynamically" });
    await expect(heading).toHaveText("Dynamically Loaded Page Elements");
  });

  test.describe("Hidden element tests", () => {
    test.beforeEach("Go to the hidden element page", async ({ page }) => {
      const link = page.getByRole("link", { name: "Example 1" });
      await link.click();
    });

    test("Hidden element page test", async ({ page }) => {
      const heading2 = page.getByRole("heading", { name: "Example 1" });
      await expect(heading2).toHaveText(
        "Example 1: Element on page that is hidden"
      );
    });

    test("Hidden element test", async ({ page }) => {
      const button = page.getByRole("button", { name: "Start" });
      const element = page.locator("#finish");

      await expect(element).not.toBeVisible();
      await button.click();
      await expect(element).toBeVisible({ timeout: 10_000 });
    });
  });
});
