import { test, expect } from "@playwright/test";

test("laptop closing unlocks the birthday sequence", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".laptop")).toHaveCSS("opacity", "1");
  await expect(page.locator(".cake")).toHaveCSS("opacity", "0");
  await page
    .getByRole("button", { name: "Close the owl’s laptop", exact: true })
    .click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "closing",
  );
  await expect
    .poll(() =>
      page
        .locator(".laptop-lid")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe("none");
  await expect(
    page.getByRole("button", { name: "Blow candles", exact: true }),
  ).toBeEnabled();
  await expect(page.locator(".laptop")).toHaveCSS("opacity", "0");
  await expect(page.locator(".cake")).toHaveCSS("opacity", "1");
});

test("the large slogan appears only on the dancing screen, clear of the animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const slogan = page.getByRole("heading", {
      name: "LEADERS DON’T SLEEP.",
      exact: true,
    });
    await expect(slogan).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Change outfit|Photo booth/ }),
    ).toHaveCount(0);
    for (const action of [
      "Close the laptop",
      "Blow candles",
      "Cut the cake",
      "Take a bite",
    ]) {
      await page.getByRole("button", { name: action, exact: true }).click();
    }
    await expect(
      page.getByRole("button", { name: "Let’s dance", exact: true }),
    ).toBeEnabled();
    await expect(slogan).toHaveCount(0);
    await page
      .getByRole("button", { name: "Let’s dance", exact: true })
      .click();
    await expect(slogan).toBeVisible();
    expect(
      await slogan.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThan(24);
    const bounds = await slogan.boundingBox();
    const floor = await page.locator(".dance-floor").boundingBox();
    expect(bounds!.y).toBeGreaterThan(floor!.y + floor!.height);
    await page
      .getByRole("button", { name: "Start again", exact: true })
      .click();
    await expect(slogan).toHaveCount(0);
  }
});
