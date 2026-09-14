import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiIndex {
  nodes: { id: string; type: string }[];
}

interface AssessmentNode {
  id: string;
  meta: {
    weight: number;
    marking:
      | { mode: "holistic" }
      | { mode: "weighted"; criteria: { name: string; weight: number }[] };
  };
}

const index = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as ApiIndex;

const assessments = index.nodes
  .filter((node) => node.type === "assessments")
  .map(
    (node) =>
      JSON.parse(readFileSync(resolve("dist/api", `${node.id}.json`), "utf8")) as AssessmentNode,
  );

describe("assessment weighting", () => {
  it("has all four assessments, together worth exactly 100% of the course", () => {
    expect(assessments).toHaveLength(4);
    const total = assessments.reduce((sum, assessment) => sum + assessment.meta.weight, 0);
    expect(total).toBe(100);
  });

  it.each(
    assessments
      .filter((assessment) => assessment.meta.marking.mode === "weighted")
      .map((assessment) => [assessment.id, assessment] as const),
  )("%s's weighted marking criteria sum to exactly 100", (_id, assessment) => {
    const marking = assessment.meta.marking as { mode: "weighted"; criteria: { weight: number }[] };
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    expect(total).toBe(100);
  });
});
