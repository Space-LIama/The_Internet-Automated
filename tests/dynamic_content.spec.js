const { test, expect } = require("@playwright/test");

test.describe("Dynamic content page tests", () => {
  test.beforeEach("Go to the dynamic content page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Dynamic Content" });
    await link.click();
  });

  test("Dynamic content page test", async ({ page }) => {
    const header = page.getByRole("heading", { name: "Dynamic" });
    await expect(header).toHaveText("Dynamic Content");
  });

  test.describe("Dynamic content tests", () => {
    test("All dynamic text changes after page reload", async ({ page }) => {
      const content = page.locator("#content>div.row"); // children of the content element
      await expect(content).toHaveCount(3);
      const allContent = await content.all(); // array of all content divs

      const contentArr1 = [];
      for (let i = 0; i < 3; i++)
        contentArr1.push((await allContent.at(i).textContent()).trim()); // filling array with text from dynamic div elements

      await page.reload();

      const contentArr2 = [];
      for (let i = 0; i < 3; i++)
        contentArr2.push((await allContent.at(i).textContent()).trim());

      contentArr1.forEach(
        (val, index) => expect(val).not.toBe(contentArr2[index]) // checking that text is different after page reloads
      );
    });

    test("Only last dynamic box changes with the static option enabled", async ({
      page,
    }) => {
      const staticLink = page.getByRole("link", { name: "click here" });
      await staticLink.click(); // making first 2 content divs static

      const content = page.locator("#content>div.row"); // children of the content element
      await expect(content).toHaveCount(3);
      const allContent = await content.all(); // array of all content divs

      const contentArr1 = [];
      for (let i = 0; i < 3; i++)
        contentArr1.push((await allContent.at(i).textContent()).trim()); // filling array with text from dynamic div elements

      await page.reload();

      const contentArr2 = [];
      for (let i = 0; i < 3; i++)
        contentArr2.push((await allContent.at(i).textContent()).trim());

      contentArr1.forEach(
        (val, index) =>
          index === 2
            ? expect(val).not.toBe(contentArr2[index]) // index = 2 => last element => text changes
            : expect(val).toBe(contentArr2[index]) // index != 2 => not the last element => text stays the same
      );
    });
  });
});
