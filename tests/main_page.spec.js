const { test, expect } = require("@playwright/test");

test.describe("main page tests", () => {
  test.beforeEach("go to home url", async ({ page }) => {
    await page.goto("/");
  });

  test("Page title check", async ({ page }) => {
    await expect(page).toHaveTitle("The Internet");
  });

  test("Page h1 check", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Welcome" });
    await expect(heading).toHaveText("Welcome to the-internet");
  });

  test("Add/Remove Elements link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Add/Remove" });
    await link.click();
    await expect(page).toHaveURL(/.*add_remove_elements/);
  });

  test("Broken Images link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Broken" });
    await link.click();
    await expect(page).toHaveURL(/.*broken_images/);
  });

  test("Challenging DOM link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Challenging" });
    await link.click();
    await expect(page).toHaveURL(/.*challenging_dom/);
  });

  test("Checkboxes link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Checkboxes" });
    await link.click();
    await expect(page).toHaveURL(/.*checkboxes/);
  });

  test("Context menu link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Context" });
    await link.click();
    await expect(page).toHaveURL(/.*context_menu/);
  });

  test("Disappeaing elements link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Disappearing" });
    await link.click();
    await expect(page).toHaveURL(/.*disappearing_elements/);
  });

  test("Drag and drop link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Drag" });
    await link.click();
    await expect(page).toHaveURL(/.*drag_and_drop/);
  });

  test("Dropdown link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Dropdown" });
    await link.click();
    await expect(page).toHaveURL(/.*dropdown/);
  });

  test("Dynamic content link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Dynamic Content" });
    await link.click();
    await expect(page).toHaveURL(/.*dynamic_content/);
  });

  test("Dynamic controls link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Dynamic Controls" });
    await link.click();
    await expect(page).toHaveURL(/.*dynamic_controls/);
  });
});
