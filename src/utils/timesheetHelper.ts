import { PROJECT_OPTIONS } from "../constants";

export const getTimesheetStatus = (totalHours: number) => {
  if (totalHours === 0) {
    return "MISSING";
  }

  if (totalHours < 40) {
    return "INCOMPLETE";
  }

  return "COMPLETED";
};

export const getProjectName = (projectId: string) => {
  return PROJECT_OPTIONS.find((t) => t.id === projectId)?.label;
};
