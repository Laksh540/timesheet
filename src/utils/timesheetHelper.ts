export const getTimesheetStatus = (totalHours: number) => {
  if (totalHours === 0) {
    return "MISSING";
  }

  if (totalHours < 40) {
    return "INCOMPLETE";
  }

  return "COMPLETED";
};