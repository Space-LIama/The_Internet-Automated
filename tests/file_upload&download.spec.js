const { test, expect } = require("@playwright/test");
const fs = require("fs").promises;
const path = require("path");

// I need to run these 2 page tests in sequence, as I am downloading the same file I am uploading in first step
// That is the reason for them being in one test file

// File Upload tests
test.describe("File upload page tests", () => {
  test.beforeEach("Got to the file upload page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "File Upload" });
    await link.click();
  });

  test("File upload", async ({ page }) => {
    const fileChooserPromice = page.waitForEvent("filechooser");
    const chooseButton = page.locator("#file-upload");
    await chooseButton.click();

    const fileChooser = await fileChooserPromice;
    await fileChooser.setFiles(path.resolve(__dirname, "../testfile.json"));

    const uploadButton = page.getByRole("button", { name: "Upload" });
    await uploadButton.click();

    const fileName = page.locator("#uploaded-files");
    await expect(fileName).toHaveText("testfile.json");
  });
});

// file download tests
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
      name: "testfile.json",
      exact: true,
    });
    const downloadPromice = page.waitForEvent("download");

    await downloadLink.click();
    const download = await downloadPromice;
    const path = await download.path(); // in case of dowload failure this methid will throw exception and fail the test

    const fileContent = await fs.readFile(path);
    const fileData = fileContent.toString();
    console.log(`File content:${fileData}`);
    // expect(fileData).toBe("Sample");
  });
});
