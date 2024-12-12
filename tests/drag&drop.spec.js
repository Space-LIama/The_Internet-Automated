const { test, expect } = require("@playwright/test");

test.describe("Drag and drop page tests", () => {
  test.beforeEach("Go to drag and drop page", async ({ page }) => {
    page.goto("/");
    const link = page.getByRole("link", { name: "Drag" });
    await link.click();
  });

  test("Drag and drop elements page test", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Drag" });
    await expect(heading).toHaveText("Drag and Drop");
  });

  test("Element drag and drop test", async ({ page }) => {
    const el1 = page.locator("#column-a");
    const el2 = page.locator("#column-b");

    await expect(el1.locator("header")).toHaveText("A");
    await expect(el2.locator("header")).toHaveText("B");

    await el1.dragTo(el2); // performing the drag and drop

    // After successfull drag and drop elements' headers should swap
    await expect(el1.locator("header")).toHaveText("B");
    await expect(el2.locator("header")).toHaveText("A");
  });
});
