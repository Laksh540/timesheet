export interface Timesheet {
  id?: string;
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

export interface WeekDetail {
  id?: string;
  timesheetId?: string;
  date: string;
  task: string;
  hours: number;
}
