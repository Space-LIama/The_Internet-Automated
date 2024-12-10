const { test, expect } = require("@playwright/test");

test.describe("Context menu page tests", () => {
  test.beforeEach("Go to the context menu page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Context" });
    await link.click();
  });

  test("Check the page heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Context" });
    await expect(heading).toHaveText("Context Menu");
  });

  test("Right click on the context menu", async ({ page }) => {
    const contextMenu = page.locator("#hot-spot");

    page.once("dialog", (dialog) => {
      // single-use listener for the dialog pop-up
      const message = dialog.message();
      console.log(`Dialog message: ${message}`);
      expect(message).toBe("You selected a context menu");
      dialog.accept();
    });

    await contextMenu.click({ button: "right" });
  });
});
