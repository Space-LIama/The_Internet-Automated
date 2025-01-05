const { test, expect } = require("@playwright/test");

test.describe("Dynamic controls page tests", () => {
  test.beforeEach("Go to the dynamic controls page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Dynamic controls" });
    await link.click();
  });

  test("Dynamic controls page test", async ({ page }) => {
    const header = page.getByRole("heading", { name: "Dynamic" });
    await expect(header).toHaveText("Dynamic Controls");
  });

  test.describe("Checkbox tests", () => {
    test("Check a checkbox", async ({ page }) => {
      const checkbox = page.getByRole("checkbox");
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    });

    test("Delete the checkbox", async ({ page }) => {
      const removeButton = page.getByRole("button", { name: "Remove" });
      const checkbox = page.getByRole("checkbox");
      await removeButton.click();
      await expect(checkbox).not.toBeVisible();
    });

    test("Add checkbox back after removing it", async ({ page }) => {
      const removeButton = page.getByRole("button", { name: "Remove" });
      const addButton = page.getByRole("button", { name: "Add" });
      const checkbox = page.getByRole("checkbox");
      const message = page.locator("#message");

      await removeButton.click();
      await expect(message).toHaveText("It's gone!");

      await addButton.click();
      await expect(message).toHaveText("It's back!");
      await expect(checkbox).not.toBeChecked();
    });
  });
});
