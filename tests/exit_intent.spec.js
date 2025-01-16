const { test, expect } = require("@playwright/test");

test.use({ browserName: "chromium" }); // this test works only in chromium browser.
// Something to do with the mouse implementation as in this case I am required to use negative coordinates

test.describe("Exit intent page tests", () => {
  test.beforeEach("Go to the testing page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "exit" });
    await link.click();
  });

  test("Page heading test", async ({ page }) => {
    const heading = page.getByRole("heading");
    await expect(heading).toHaveText("Exit Intent");
  });

  test("Viewport exiting test", async ({ page }) => {
    // This is the main test for the page. User cursor goes out of the viewport to activate modal window
    const viewport = page.viewportSize();
    await page.mouse.move(viewport.width / 2, 100); // verify that mouse is on the viewport
    await page.mouse.move(viewport.width / 2, -100); // move mouse out of the viewport

    const modal = page.locator("#ouibounce-modal");
    await expect(modal).toBeVisible();
  });
});
