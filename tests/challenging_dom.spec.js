const { test, expect } = require("@playwright/test");

test.describe("Challengin DOM page tests", () => {
  test.beforeEach("Go to challengin DOM page", async ({ page }) => {
    page.goto("/");
    const link = page.getByRole("link", { name: "Challenging" });
    await link.click();
  });

  test("Challenging DOM page test", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Challenging" });
    await expect(heading).toHaveText("Challenging DOM");
  });

  test.describe("Tests for buttons with generated id", () => {
    let buttons;
    test.beforeEach("Get the buttons locator", async ({ page }) => {
      buttons = page.locator(`a[class~="button"]`);
    });

    test("Buttons count = 3", async ({ page }) => {
      await expect(buttons).toHaveCount(3);
    });

    test("Click on the buttons", async ({ page }) => {
      for (let i = 0; i < 3; i++) {
        const buttonId = await buttons.nth(i).getAttribute("id");
        await buttons.nth(i).click(); // after the button is clicked id is changed
        await expect(buttons.nth(i)).not.toHaveId(buttonId); // assert that id has changed
      }
    });
  });
});
