const { test, expect } = require("@playwright/test");

test.describe("Dropdown page tests", () => {
  test.beforeEach("Go to the dropdown page", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Dropdown" });
    await link.click();
  });

  test("Dropdown page test", async ({ page }) => {
    const header = page.getByRole("heading", { name: "Dropdown" });
    await expect(header).toHaveText("Dropdown List");
  });

  test.describe("Dropdown tests", () => {
    let dropdown;

    test.beforeEach("Get the dropdown locator", async ({ page }) => {
      dropdown = page.locator("#dropdown");
    });

    test("Default dropdown state test", async () => {
      const selected = dropdown.getByRole("option", { name: "Please" }); // Select the default option
      await expect(selected).toHaveAttribute("selected"); // Checking that the default option is selected
      await expect(selected).toHaveText("Please select an option");
    });

    test("Option 1 test", async () => {
      const selected = dropdown.getByRole("option", { name: "1" }); // Select option 1

      await dropdown.selectOption("1"); // option 1 is now selected

      expect(await dropdown.inputValue()).toBe("1");
      await expect(selected).toHaveAttribute("selected");
      await expect(selected).toHaveText("Option 1");
    });

    test("Option 2 test", async () => {
      const selected = dropdown.getByRole("option", { name: "2" }); // Select option 1

      await dropdown.selectOption("2"); // option 1 is now selected

      expect(await dropdown.inputValue()).toBe("2");
      await expect(selected).toHaveAttribute("selected");
      await expect(selected).toHaveText("Option 2");
    });
  });
});
