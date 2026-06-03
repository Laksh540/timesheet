import { addWeeks, format, startOfWeek, addDays } from "date-fns";
import {
  createTimesheet,
  createWeekDetail,
  getTimesheets,
} from "../api/timesheet";
import type { Timesheet } from "../types/timesheet";

export const seedDatabase = async () => {
  const existingTimesheets = await getTimesheets();

  if (existingTimesheets.length > 0) {
    return;
  }

  const currentWeekStart = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  for (let i = 0; i < 24; i++) {
    const weekStart = addWeeks(currentWeekStart, -i);

    const weekEnd = addDays(weekStart, 4);

    const timesheet: Timesheet = {
      id: i + 1,
      weekLabel: `${format(weekStart, "d MMM")} - ${format(
        weekEnd,
        "d MMM yyyy",
      )}`,
      weekStart: format(weekStart, "yyyy-MM-dd"),
      weekEnd: format(weekEnd, "yyyy-MM-dd"),
      status: i === 0 ? "COMPLETED" : i === 1 ? "INCOMPLETE" : "MISSING",
    };

    await createTimesheet(timesheet);

    // Latest week → COMPLETED (40 hours)
    if (i === 0) {
      for (let day = 0; day < 5; day++) {
        await createWeekDetail({
          timesheetId: timesheet.id,
          date: format(addDays(weekStart, day), "yyyy-MM-dd"),
          task: `Task ${day + 1}`,
          hours: 8,
        });
      }
    }

    // Second week → INCOMPLETE (10 hours)
    if (i === 1) {
      await createWeekDetail({
        timesheetId: timesheet.id,
        date: format(weekStart, "yyyy-MM-dd"),
        task: "Partial Work",
        hours: 10,
      });
    }
  }
};
