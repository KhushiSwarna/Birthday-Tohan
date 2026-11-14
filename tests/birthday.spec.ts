import { expect, test } from "@playwright/test";

test("birthday greeting is immediate and the old trading content is gone", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "HAPPY BIRTHDAY TOHAN BHAIYA",
  );
  await expect(
    page.getByRole("button", { name: "MAKE A WISH", exact: true }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText(
    /NIKE|PERSONAL EQUITY|FINAL ASSET|TRADING|PORTFOLIO/,
  );
  expect(errors).toEqual([]);
});

test("every replay relights the candles and starts fresh fireworks", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "MAKE A WISH", exact: true }).click();
  await expect(page.locator(".birthday-owl")).toHaveClass(/wish-made/);
  await expect(page.locator(".wish-instruction")).toHaveText(
    "Wish made. Party mode: ON!",
  );
  await expect(page.locator(".candle-flame").first()).toHaveCSS("opacity", "0");
  for (const run of [2, 3]) {
    await page
      .getByRole("button", { name: "ONE MORE WISH?", exact: true })
      .click();
    await expect(page.locator(".birthday-owl")).not.toHaveClass(/wish-made/);
    await expect(page.locator(".wish-instruction")).toHaveText(
      "Another wish. Make it a good one.",
    );
    for (const flame of await page.locator(".candle-flame").all())
      await expect(flame).toHaveCSS("opacity", "1");
    await expect(page.locator(".party-fireworks")).toHaveAttribute(
      "data-celebration",
      String(run),
    );
    await expect(page.locator(".party-fireworks")).toHaveAttribute(
      "data-active",
      "true",
    );
    await expect
      .poll(() =>
        page
          .locator(".party-fireworks")
          .evaluate((element: HTMLCanvasElement) => {
            const ctx = element.getContext("2d");
            if (!ctx) return false;
            return ctx
              .getImageData(0, 0, element.width, element.height)
              .data.some((value, i) => i % 4 === 3 && value > 0);
          }),
      )
      .toBe(true);
    await expect(page.locator(".birthday-owl")).toHaveClass(/wish-made/);
    await expect(page.locator(".candle-flame").first()).toHaveCSS(
      "opacity",
      "0",
    );
  }
  await expect(page.locator(".party-decorations")).toHaveClass(
    /decorations-visible/,
  );
});

test("replay has visible feedback even with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "MAKE A WISH", exact: true }).click();
  await page
    .getByRole("button", { name: "ONE MORE WISH?", exact: true })
    .click();
  await expect(page.locator(".birthday-owl")).not.toHaveClass(/wish-made/);
  await expect(page.locator(".candle-flame").first()).toHaveCSS("opacity", "1");
  await expect(page.locator(".wish-instruction")).toHaveText(
    "Another wish. Make it a good one.",
  );
  await expect(page.locator(".birthday-owl")).toHaveClass(/wish-made/);
  await expect(page.locator(".wish-instruction")).toHaveText(
    "Wish made. Party mode: ON!",
  );
  await expect(page.locator(".party-fireworks")).toHaveCSS("display", "none");
  await expect(page.locator(".party-decorations")).toHaveCSS(
    "visibility",
    "visible",
  );
});

test("cake, owl, and present respond to touch and keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const owl = page.getByRole("button", {
    name: "Give the birthday owl a wink",
  });
  await owl.focus();
  await owl.press("Enter");
  await expect(page.locator(".birthday-owl")).toHaveClass(/is-winking/);
  const present = page.getByRole("button", { name: "Open birthday present" });
  await present.click();
  await expect(
    page.getByRole("button", { name: "Close birthday present" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".gift-note")).toContainText("Best. Bhaiya. Ever.");
  await page.getByRole("button", { name: "Close birthday present" }).click();
  await expect(page.locator(".gift-note")).toBeEmpty();
  await page
    .getByRole("button", { name: "Blow out the birthday candles" })
    .click();
  await expect(page.locator(".birthday-owl")).toHaveClass(/wish-made/);
});

test("sound is opt-in and can be muted during celebration", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Enable party sound" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Enable party sound" }).click();
  await page.getByRole("button", { name: "MAKE A WISH", exact: true }).click();
  await page.getByRole("button", { name: "Mute party sound" }).click();
  await expect(
    page.getByRole("button", { name: "Enable party sound" }),
  ).toHaveAttribute("aria-pressed", "false");
  expect(errors).toEqual([]);
});

test("small phones through desktop stay within the viewport with reduced motion", async ({
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
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `${viewport.width}px overflow`,
    ).toBe(false);
    await page
      .getByRole("button", { name: "MAKE A WISH", exact: true })
      .click();
    await expect(page.locator(".party-confetti")).toHaveCSS("display", "none");
    await expect(page.locator(".wish-instruction")).toContainText("Wish made");
    await page.getByRole("button", { name: "Open birthday present" }).click();
    await expect(page.locator(".gift-note")).toContainText(
      "Best. Bhaiya. Ever.",
    );
  }
});
