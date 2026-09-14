import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// 855 is the fixed suffix this repo was provisioned with; 3 is this course's
// chosen level (advanced undergraduate — the course assumes no prerequisite
// beyond first-year comfort with an argument, not a discipline). The teaching
// period below runs 2027-07-26 to 2027-10-18 (twelve Monday-dated weeks, with
// a one-week mid-semester break after week 6); endDate is set past the final
// project's due date so every dated node in the site stays inside it.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP3855",
  title: "Coincidence, Fate and Other Suspicious Patterns",
  session: "Semester 2",
  year: 2027,
  level: 3,
  startDate: "2027-07-26",
  endDate: "2027-11-05",
  description:
    "Humans are extraordinarily good at finding patterns — in dreams, cards, " +
    "stars and data. This course studies the territory between coincidence " +
    "and meaning, and what happens when a pattern starts to feel like it " +
    "was meant to happen.",
  tags: ["psychology", "philosophy", "media studies"],
}) satisfies CourseMetaInput;
