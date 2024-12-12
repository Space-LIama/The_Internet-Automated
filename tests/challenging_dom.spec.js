const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");
const tesseract = require("tesseract.js");

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

  test.describe("Tests for buttons with generated id and canvas element", () => {
    let buttons; // locator for 3 buttons that will be used in all tests

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

    test("Canvas change after button click", async ({ page }) => {
      const canvas = page.locator("#canvas");

      for (let i = 0; i < 3; i++) {
        const scrsBeforePath = `canvasScrs/canvasBefore${i}.png`;
        await canvas.screenshot({ path: scrsBeforePath });
        const resBefore = (await tesseract.recognize(scrsBeforePath, "eng")) // using tesseract.js library to recognize text from the canvas
          .data.text;
        console.log(`Canvas text before button #${i + 1} click: ${resBefore}`);

        await buttons.nth(i).click(); // click on any of the buttons changes the canvas text

        const scrsAfterPath = `canvasScrs/canvasAfter${i}.png`;
        await canvas.screenshot({ path: scrsAfterPath });
        const resAfter = (await tesseract.recognize(scrsAfterPath, "eng")).data // using tesseract.js library to recognize updated text from the canvas
          .text;
        console.log(`Canvas text after button #${i + 1} click: ${resAfter}`);

        expect(resBefore).not.toEqual(resAfter); // checking that the canvas has changed after the button click
      }

      // deleting screenshots directory used for the canvas tests
      fs.rm("canvasScrs", { recursive: true, force: true }, (err) => {
        if (err) throw err;

        console.log("Screenshot directory deleted");
      });
    });
  });

  test.describe("table element tests", () => {
    test("Click on all of the edit links", async ({ page }) => {
      const editLinks = page.getByRole("link", { name: "edit" });
      await page.waitForLoadState("domcontentloaded"); // waiting for DOM to load because of .all() in the next line

      for (const link of await editLinks.all()) await link.click(); // Going through edit links and clicking on each one
    });

    test("Click on all of the delete links", async ({ page }) => {
      const editLinks = page.getByRole("link", { name: "delete" });
      await page.waitForLoadState("domcontentloaded"); // waiting for DOM to load because of .all() in the next line

      for (const link of await editLinks.all()) await link.click(); // Going through edit links and clicking on each one
    });
  });
});
