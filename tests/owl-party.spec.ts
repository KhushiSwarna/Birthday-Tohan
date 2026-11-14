import { expect, test, type Page } from "@playwright/test";

const mainAction = (page: Page, name: string) =>
  page.getByRole("button", { name, exact: true });
const finishStory = async (page: Page) => {
  for (const action of [
    "Blow candles",
    "Cut the cake",
    "Take a bite",
    "Let’s dance",
  ])
    await mainAction(page, action).click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "dancing",
  );
};

test("birthday opens with music enabled and future steps locked", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "HAPPY BIRTHDAY TOHAN BHAIYA",
  );
  await expect(mainAction(page, "Turn music off")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(mainAction(page, "Step 1: Blow candles")).toBeEnabled();
  for (const label of [
    "Step 2: Cut the cake",
    "Step 3: Take a bite",
    "Step 4: Let’s dance",
  ])
    await expect(mainAction(page, label)).toBeDisabled();
  await expect(page.locator("body")).not.toContainText(
    /NIKE|PERSONAL EQUITY|TRADING/,
  );
  expect(errors).toEqual([]);
});

test("the owl blows, cuts, eats, dances, pauses, and starts over", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await mainAction(page, "Blow candles").click();
  await expect(page.locator(".birthday-owl")).toHaveAttribute(
    "data-action",
    "blowing",
  );
  await expect(page.locator(".wish-button")).toBeDisabled();
  await expect(page.locator(".blow-beak")).toHaveCSS("opacity", "1");
  await expect(mainAction(page, "Cut the cake")).toBeEnabled();
  for (const flame of await page.locator(".candle-flame").all())
    await expect(flame).toHaveCSS("opacity", "0");
  await expect(page.locator(".party-fireworks")).toHaveAttribute(
    "data-celebration",
    "1",
  );
  await mainAction(page, "Cut the cake").click();
  await expect(page.locator(".birthday-owl")).toHaveAttribute(
    "data-action",
    "cutting",
  );
  await expect
    .poll(() =>
      page
        .locator(".knife-hand")
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeGreaterThan(0.5);
  await expect(mainAction(page, "Take a bite")).toBeEnabled();
  await expect(page.locator(".cake-slice")).toHaveCSS("opacity", "1");
  await expect(page.locator(".birthday-owl")).toHaveAttribute("data-step", "2");
  await mainAction(page, "Take a bite").click();
  await expect(page.locator(".birthday-owl")).toHaveAttribute(
    "data-action",
    "eating",
  );
  await expect(mainAction(page, "Let’s dance")).toBeEnabled();
  await expect(page.locator(".cake-slice")).toHaveCSS("opacity", "0");
  await expect(page.locator(".yum-bubble")).toHaveCSS("opacity", "1");
  await mainAction(page, "Let’s dance").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "dancing",
  );
  await expect(page.locator(".owl-headphones")).toHaveCSS("opacity", "1");
  await expect(page.locator(".dance-floor")).toHaveCSS("opacity", "1");
  await expect(page.locator(".party-fireworks")).toHaveAttribute(
    "data-celebration",
    "2",
  );
  const pose = await page
    .locator(".owl-character")
    .evaluate((el) => getComputedStyle(el).transform);
  await expect
    .poll(() =>
      page
        .locator(".owl-character")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe(pose);
  await mainAction(page, "Pause the dance").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "paused",
  );
  await expect(page.locator(".owl-character")).toHaveCSS(
    "animation-name",
    "none",
  );
  await mainAction(page, "Keep dancing").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "dancing",
  );
  await mainAction(page, "Start again").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-phase",
    "ready",
  );
  await expect(page.locator(".cake-slice")).toHaveCSS("opacity", "0");
  await expect(page.locator(".candle-flame").first()).toHaveCSS("opacity", "1");
  await expect(mainAction(page, "Step 2: Cut the cake")).toBeDisabled();
  await mainAction(page, "Blow candles").click();
  await expect(mainAction(page, "Cut the cake")).toBeEnabled();
  expect(errors).toEqual([]);
});

test("music starts on interaction and stays muted when the user switches it off", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await mainAction(page, "Blow candles").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-music-state",
    "playing",
  );
  await mainAction(page, "Turn music off").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-music-state",
    "muted",
  );
  await mainAction(page, "Cut the cake").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-music-state",
    "muted",
  );
  await mainAction(page, "Turn music on").click();
  await expect(page.locator(".birthday-page")).toHaveAttribute(
    "data-music-state",
    "playing",
  );
  await mainAction(page, "Take a bite").click();
  await expect(mainAction(page, "Let’s dance")).toBeEnabled();
  expect(errors).toEqual([]);
});

test("step buttons, cake shortcut, and present work with keyboard and touch", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const blow = mainAction(page, "Step 1: Blow candles");
  await blow.focus();
  await blow.press("Enter");
  await expect(mainAction(page, "Step 2: Cut the cake")).toBeEnabled();
  await mainAction(page, "Step 2: Cut the cake").click();
  await expect(
    mainAction(page, "Take a bite by tapping the cake"),
  ).toBeEnabled();
  await mainAction(page, "Take a bite by tapping the cake").click();
  await expect(mainAction(page, "Step 4: Let’s dance")).toBeEnabled();
  await mainAction(page, "Step 4: Let’s dance").click();
  await mainAction(page, "Open birthday present").click();
  await expect(page.locator(".gift-note")).toContainText("Best. Bhaiya. Ever.");
  await mainAction(page, "Close birthday present").click();
  await expect(page.locator(".gift-note")).toBeEmpty();
});

test("all steps work with reduced motion across phone, tablet, desktop, and landscape", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await finishStory(page);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `${viewport.width}px overflow`,
    ).toBe(false);
    expect(
      await page.locator(".birthday-page").evaluate((el) => el.scrollLeft),
      `${viewport.width}px content drift`,
    ).toBe(0);
    expect(
      await page.evaluate(() => scrollX),
      `${viewport.width}px page drift`,
    ).toBe(0);
    await expect(page.locator(".party-confetti")).toHaveCSS("display", "none");
    await expect(page.locator(".party-fireworks")).toHaveCSS("display", "none");
    await expect(page.locator(".owl-character")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".dance-floor")).toHaveCSS("opacity", "1");
    await expect(page.locator(".cake-slice")).toHaveCSS("opacity", "0");
    await mainAction(page, "Start again").click();
    await expect(mainAction(page, "Blow candles")).toBeEnabled();
  }
});
