const { test, expect } = require("@playwright/test");

test.describe("Checboxes page tests", () => {
  test.beforeEach("Go to checkboxes page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Checkboxes" });
    await link.click();
  });

  test("Check the page heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Checkboxes" });
    await expect(heading).toHaveText("Checkboxes");
  });

  test.describe("Checkboxes tests", () => {
    let checkboxes;

    test.beforeEach("Get the checkboxes locator", ({ page }) => {
      checkboxes = page.getByRole("checkbox");
    });

    test("Checkboxes number = 2", async () => {
      await expect(checkboxes).toHaveCount(2);
    });

    test("Checkboxes default state test", async () => {
      // first should be unchecked, 2nd - checked
      await expect(checkboxes.first()).not.toBeChecked();
      await expect(checkboxes.last()).toBeChecked();
    });

    test("Check the first checkbox", async () => {
      await checkboxes.first().check();
      await expect(checkboxes.first()).toBeChecked();
    });

    test("Uncheck the second checkbox", async () => {
      await checkboxes.first().uncheck();
      await expect(checkboxes.first()).not.toBeChecked();
    });
  });
});
