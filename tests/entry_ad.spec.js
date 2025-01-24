const { test, expect } = require("@playwright/test");

test.describe("Entry ad page tests", () => {
  let context, page;
  // For this test I need to preserve browser state to verify that ad modal shows up only on first page entry
  // So the common browser context is created for all tests in this file
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  let modal;
  test.beforeEach("Go to the entry ad page", async () => {
    await page.goto("/");
    const testPageLink = page.getByRole("link", { name: "Entry" });
    await testPageLink.click();

    modal = page.locator("#modal");
  });

  test("First entry ad encounter test", async () => {
    await expect(modal).toBeVisible();
    const modalHeader = modal.getByRole("heading");
    await expect(modalHeader).toHaveText("This is a modal window");
    const closeButton = modal.getByText("Close");
    await closeButton.click();
  });

  test("Ad absence test after the first encounter", async () => {
    await page.waitForEvent("domcontentloaded");
    await expect(modal).not.toBeVisible();
  });

  test("Ad re-enable link test", async () => {
    const reEnableLink = page.getByRole("link", { name: "click here" });
    await reEnableLink.click();
    await expect(modal).toBeVisible();
  });
});
