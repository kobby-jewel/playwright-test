import { test, expect } from "@playwright/test";

test("Check all Hubtel for Hospitals links excluding links with / or wrong format", async ({
  page,
  browser,
}) => {
  // Navigate to Hubtel for hospitals page
  await page.goto("https://explore.hubtel.com/request-money-from-anyone/");

  // Find and collect all anchor elements on the page
  const links = await page.$$eval("a", (elements) =>
    elements.map((element) => {
      const href = element.getAttribute("href");
      return href;
    })
  );

  // Loop through each link and check if it's working
  for (const link of links) {
    if (link) {
      if (link!.startsWith("http://") || link!.startsWith("https://")) {
        var context1 = await browser.newContext();
        var page1 = await context1.newPage();
        var response = await page1.goto(link!, { timeout: 3000 * 10 });
        await context1.close();
        var statusCode = await response!.status();

        expect(statusCode).toBe(200);
        console.log(`${link} -loaded passed ✅`);
      } else {
        console.log(`${link} failed to load`);
      }
    }
  }
});
