import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Lectures argue the week's case; a Workshop is where
// students practise making (and breaking) an interpretation by hand, so the
// course's own touchpoints borrow the vocabulary of the systems it studies.
export const sessionLabels = {
  singular: "Workshop",
  plural: "Workshops",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "People", href: "/people/" },
    { text: "Approach", href: "/approach/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  // No card image: the site's visual identity is typographic and diagrammatic
  // rather than photographic (see /approach/), so a link preview falls back
  // to the theme's default treatment rather than carrying a picture.
});
