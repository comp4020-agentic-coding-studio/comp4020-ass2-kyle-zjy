import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Mirrors the primary nav in src/site-config.ts. Kept as a literal list
// rather than imported: the build's own broken-links checker already fails
// the build if a nav href 404s, so what this test protects instead is that
// each destination is a real page with real content, not a stub that merely
// happens to exist.
const navDestinations = [
  "lectures",
  "sessions",
  "assessments",
  "people",
  "approach",
  "policies",
];

const placeholderMarkers = ["STARTER_CONTENT", "Replace this page", "Course Title Goes Here"];

describe("primary navigation", () => {
  it.each(navDestinations)("/%s/ resolves to a real, non-placeholder page", (segment) => {
    const filePath = resolve("dist", segment, "index.html");
    expect(existsSync(filePath)).toBe(true);

    const html = readFileSync(filePath, "utf8");
    for (const marker of placeholderMarkers) {
      expect(html).not.toContain(marker);
    }
    // A stub page renders almost nothing; a real one comfortably clears this.
    expect(html.length).toBeGreaterThan(2000);
  });
});
