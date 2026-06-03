export interface Timesheet {
  id: number;
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

export interface WeekDetail {
  id?: number;
  timesheetId: number;
  date: string;
  task: string;
  hours: number;
}
