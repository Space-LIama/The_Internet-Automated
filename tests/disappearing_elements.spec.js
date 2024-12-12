const { test, expect } = require("@playwright/test");

test.describe("Disappearing elements page tests", () => {
  test.beforeEach("Go to disappearing elements page", async ({ page }) => {
    page.goto("/");
    const link = page.getByRole("link", { name: "Disappearing" });
    await link.click();
  });

  test("Disappearing elements page test", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Disappearing" });
    await expect(heading).toHaveText("Disappearing Elements");
  });

  test("Gallery link test", async ({ page }) => {
    const link = page.getByRole("link", { name: "Gallery" });
    let linkFound = await link.isVisible(); // boolean variable representing if link is visible on the page

    while (!linkFound) {
      // reloading the page until the gallery link becomes visible
      await page.reload();
      console.log("Gallery link is not visible. Reloading the page");
      linkFound = await link.isVisible();
    }

    await link.click();
    await expect(page.getByRole("heading")).toHaveText("Not Found");
  });
});
