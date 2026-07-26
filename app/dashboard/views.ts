export type ViewId =
  | "overview"
  | "systems"
  | "case-studies"
  | "experience"
  | "enquiries"
  | "stack"
  | "services"
  | "notes"
  | "traffic"
  | "redirects"
  | "deploys"
  | "settings";

export const VIEW_TITLES: Record<ViewId, string> = {
  overview: "Overview",
  systems: "Systems",
  "case-studies": "Case studies",
  experience: "Experience",
  enquiries: "Enquiries",
  stack: "Stack list",
  services: "Services",
  notes: "Notes",
  traffic: "Traffic",
  redirects: "Redirects",
  deploys: "Deploys",
  settings: "Settings",
};
