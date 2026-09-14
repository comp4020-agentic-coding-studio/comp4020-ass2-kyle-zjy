import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiIndex {
  nodes: { id: string; type: string }[];
}

interface LectureNode {
  id: string;
  body: string;
  meta: {
    week: number;
    date: string;
    question: string;
    slides?: string;
    activity?: { kind: string; prompt: string };
  };
}

const index = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as ApiIndex;

const lectures = index.nodes
  .filter((node) => node.type === "lectures")
  .map(
    (node) =>
      JSON.parse(readFileSync(resolve("dist/api", `${node.id}.json`), "utf8")) as LectureNode,
  )
  .sort((a, b) => a.meta.week - b.meta.week);

describe("the twelve-week curriculum", () => {
  it("has exactly twelve lecture weeks, numbered 1 to 12 with no gaps or repeats", () => {
    expect(lectures).toHaveLength(12);
    expect(lectures.map((lecture) => lecture.meta.week)).toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1),
    );
  });

  it.each(lectures.map((lecture) => [lecture.meta.week, lecture] as const))(
    "week %i has a visible date, a stated weekly question, and substantive content",
    (_week, lecture) => {
      expect(lecture.meta.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(lecture.meta.question.trim().length).toBeGreaterThan(10);
      expect(lecture.meta.question.trim().endsWith("?")).toBe(true);
      // A real argument, not a stub: comfortably longer than a one-line summary.
      expect(lecture.body.length).toBeGreaterThan(500);
    },
  );

  it.each(lectures.map((lecture) => [lecture.meta.week, lecture] as const))(
    "week %i's lecture page embeds a working, non-scored interactive activity",
    (_week, lecture) => {
      expect(lecture.meta.activity).toBeDefined();
      expect(["perception", "interpret", "oracle"]).toContain(lecture.meta.activity?.kind);
      expect(lecture.meta.activity?.prompt.trim().length).toBeGreaterThan(10);
    },
  );

  it("week 5 links to a working slide deck", () => {
    const week5 = lectures.find((lecture) => lecture.meta.week === 5);
    expect(week5?.meta.slides).toBe("/decks/week-05/");
    expect(existsSync(resolve("dist/decks/week-05/index.html"))).toBe(true);
  });

  it("week 11 meaningfully covers algorithms as a modern form of prediction", () => {
    const week11 = lectures.find((lecture) => lecture.meta.week === 11);
    const mentions = (week11?.body.toLowerCase().match(/algorithm/g) ?? []).length;
    expect(mentions).toBeGreaterThanOrEqual(2);
  });
});
