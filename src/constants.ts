export const TimesheetStatus = {
  COMPLETED: "COMPLETED",
  INCOMPLETE: "INCOMPLETE",
  MISSING: "MISSING",
} as const;

export const PROJECT_OPTIONS = [
  {
    id: "website-redesign",
    label: "Website Redesign",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
  },
  {
    id: "admin-dashboard",
    label: "Admin Dashboard",
  },
];

export const WORK_TYPE_OPTIONS = [
  {
    id: "bug-fixes",
    label: "Bug Fixes",
  },
  {
    id: "feature-development",
    label: "Feature Development",
  },
  {
    id: "testing",
    label: "Testing",
  },
];
