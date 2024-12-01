const { test, expect } = require("@playwright/test");

// This test pases because oh HTTPCredentials config set in the playwright.config.js
test("basic authentication test", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: "Basic" });
  await link.click();

  const heading = page.getByRole("heading", { name: "Basic" });
  await expect(heading).toHaveText("Basic Auth");
});
