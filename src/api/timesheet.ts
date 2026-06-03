import type { Timesheet, WeekDetail } from "../types/timesheet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTimesheets = async (): Promise<Timesheet[]> => {
  const response = await fetch(`${API_BASE_URL}/timesheets`);

  if (!response.ok) {
    throw new Error("Failed to fetch timesheets");
  }

  return response.json();
};

export const getWeekDetails = async (): Promise<WeekDetail[]> => {
  const response = await fetch(`${API_BASE_URL}/weekDetails`);

  if (!response.ok) {
    throw new Error("Failed to fetch week details");
  }

  return response.json();
};

export const createTimesheet = async (data: Timesheet) => {
  const response = await fetch(`${API_BASE_URL}/timesheets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const createWeekDetail = async (data: WeekDetail) => {
  await fetch(`${API_BASE_URL}/weekDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateTimesheet = async (id: number, data: Partial<Timesheet>) => {
  await fetch(`${API_BASE_URL}/timesheets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
