const { test, expect } = require("@playwright/test");
const fs = require("fs").promises;

test.describe("File download page tests", () => {
  test.beforeEach("Go to the file download page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "File Download", exact: true });
    await link.click();
  });

  test("File download page test", async ({ page }) => {
    const heading = page.getByRole("heading");
    await expect(heading).toHaveText("File Downloader");
  });

  test("File download test", async ({ page }) => {
    const downloadLink = page.getByRole("link", {
      name: "sample.txt",
      exact: true,
    });
    const downloadPromice = page.waitForEvent("download");

    await downloadLink.click();
    const download = await downloadPromice;
    const path = await download.path(); // in case of dowload failure this methid will throw exception and fail the test

    const fileContent = await fs.readFile(path);
    const fileData = fileContent.toString();
    console.log(`File content:${fileData}`);
    expect(fileData).toBe("Sample");
  });
});
