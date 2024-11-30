const { test, expect } = require("@playwright/test");

test.describe("add/remove page tests", () => {
  test.beforeEach("go to add/remove page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Add/Remove" });
    await link.click();
  });

  test("Check heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Add/Remove" });
    await expect(heading).toHaveText("Add/Remove Elements");
  });

  test("Add element", async ({ page }) => {
    const addButton = page.getByRole("button", { name: "Add" });
    await addButton.click();
    const newButton = page.getByRole("button", { name: "Delete" });
    await expect(newButton).toBeVisible();
  });

  test("Add several elements", async ({ page }) => {
    const randNum = Math.floor(Math.random() * 10 + 1); // get random number from 1 to 10
    const addButton = page.getByRole("button", { name: "Add" });

    for (let i = 0; i < randNum; i++) await addButton.click(); // add [randNum] number of elements to the page

    const newButtons = page.getByRole("button", { name: "Delete" });
    await expect(newButtons).toHaveCount(randNum);
  });

  test("Delete an element", async ({ page }) => {
    const addButton = page.getByRole("button", { name: "Add" });
    for (let i = 0; i < 5; i++) await addButton.click(); // add 5 elements to the page

    const newButtons = page.getByRole("button", { name: "Delete" });
    await newButtons.last().click();
    await expect(newButtons).toHaveCount(4);
  });
});
