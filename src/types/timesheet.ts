export interface Timesheet {
  id?: string;
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

export interface WeekDetail {
  id?: number;
  timesheetId: string;
  date: string;
  task: string;
  hours: number;
}
