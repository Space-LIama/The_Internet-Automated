const { test, expect } = require("@playwright/test");

test.describe("Entry ad page tests", () => {
  test("Entry ad test", async ({ page }) => {
    // this test requres a set of sequential actions to be performed.
    // To preserve the browser state I've decided to go with a longer test case with multiple assertions,
    // even though in breaks the modularity principles

    // navigating to the test page
    await page.goto("/");
    const testPageLink = page.getByRole("link", { name: "Entry" });
    await testPageLink.click();

    // Verifying that modal window is displayed to the user on the first entry
    const modal = page.locator("#modal");
    await expect(modal).toBeVisible();
    const modalHeader = modal.getByRole("heading");
    await expect(modalHeader).toHaveText("This is a modal window");
    const closeButton = modal.getByText("Close");
    await closeButton.click();

    // Verifying that after going back and coming back to the same page the modal is not visible to the user
    await page.goBack();
    await testPageLink.click();
    await page.waitForLoadState("domcontentloaded");
    await expect(modal).not.toBeVisible();

    // Verifying the re-enable functionality
    const reEnableLink = page.getByRole("link", { name: "click here" });
    await reEnableLink.click();

    await page.goBack();
    await testPageLink.click();
    await expect(modal).toBeVisible();
  });
});
