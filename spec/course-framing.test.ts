import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiIndex {
  course: { code: string; title: string };
  nodes: { id: string; type: string }[];
}

interface LectureNode {
  id: string;
  body: string;
}

const index = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as ApiIndex;
const normalize = (text: string) => text.replace(/\s+/g, " ").toLowerCase();

const lectureBody = (slug: string): string => {
  const node = JSON.parse(
    readFileSync(resolve("dist/api/lectures", `${slug}.json`), "utf8"),
  ) as LectureNode;
  return normalize(node.body);
};

describe("course identity is represented consistently", () => {
  it("the homepage states the course code and full title", () => {
    const html = readFileSync(resolve("dist/index.html"), "utf8");
    expect(html).toContain(index.course.code);
    expect(html).toContain(index.course.title);
  });

  it.each([
    "index",
    "lectures/index",
    "sessions/index",
    "assessments/index",
    "people/index",
    "approach/index",
    "policies/index",
  ])("%s carries the site identity in its navigation", (page) => {
    const html = readFileSync(resolve("dist", `${page}.html`), "utf8");
    // The site wordmark, not the course code — a page-level detail route
    // (a single lecture, a single person) legitimately drops the course
    // code from its own <title>, but every page shares one nav and footer.
    expect(html).toContain("Slop University");
  });

  it("the homepage states the course's central question, prominently and verbatim", () => {
    const html = normalize(readFileSync(resolve("dist/index.html"), "utf8"));
    expect(html).toContain(normalize("When does a coincidence become meaningful?"));
  });
});

describe("no page presents a divination system as an established, working predictor", () => {
  // Each week studies a system that has, at most, a mundane mechanism (a
  // symbol set, a random draw, plain arithmetic) — never a confirmed
  // predictive one. Each check below looks for that week's own specific
  // hedge, in its own words, rather than one generic disclaimer reused
  // everywhere.
  const hedges: [slug: string, topic: string, hedge: string][] = [
    ["week-03", "omens", "none of this requires the omen to have any causal connection"],
    ["week-06", "astrology", "have not found accuracy above chance"],
    ["week-06", "astrology", "no confirmed mechanism"],
    ["week-07", "tarot", "nothing to do with prophecy"],
    ["week-08", "the I Ching", "no information about your specific situation enters the system"],
    ["week-09", "numerology", "interpretive leap"],
  ];

  it.each(hedges)("week %s (%s) states plainly: %s", (slug, _topic, hedge) => {
    expect(lectureBody(slug)).toContain(normalize(hedge));
  });
});
