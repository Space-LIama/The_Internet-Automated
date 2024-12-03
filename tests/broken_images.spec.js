const { test, expect } = require("@playwright/test");

test.describe("Broken images page tests", () => {
  test.beforeEach("Go to broken images page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Broken" });
    await link.click();
  });

  test("Broken images page test", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Broken" });
    await expect(heading).toHaveText("Broken Images");
  });

  // this test goes over all img elements on the page
  test("Images test", async ({ page }) => {
    await page.waitForLoadState("domcontentloaded"); // need to wait for DOM to load because of .all() in the next line
    const imgArr = await page.getByRole("img").all();

    for (let i = 0; i < imgArr.length; i++) {
      await expect.soft(imgArr[i]).toHaveAttribute("src");
      const imgSRC = await imgArr[i].getAttribute("src");

      if (imgSRC) {
        const res = await page.request.get(
          // get response from the image link. If it's OK (200), image should load
          `https://the-internet.herokuapp.com/${imgSRC}` // URL compiles from base URL + image URL
        );

        await expect.soft(res, `Failed to load ${imgSRC}`).toBeOK();
      }
    }
  });
});
