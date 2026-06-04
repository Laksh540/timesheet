import type { Timesheet, WeekDetail } from "../types/timesheet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTimesheets = async (): Promise<Timesheet[]> => {
  const response = await fetch(`${API_BASE_URL}/timesheets`);

  if (!response.ok) {
    throw new Error("Failed to fetch timesheets");
  }

  return response.json();
};

export const getTimesheetById = async (timesheetId: string) => {
  const response = await fetch(`${API_BASE_URL}/timesheets/${timesheetId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch timesheet");
  }

  return response.json();
};

export const getWeekDetailsByTimesheetId = async (timesheetId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/weekDetails?timesheetId=${timesheetId}`,
  );

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
  const response = await fetch(`${API_BASE_URL}/weekDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create week detail");
  }

  return response.json();
};

export const updateWeekDetail = async (
  id: string,
  data: Partial<WeekDetail>,
) => {
  const response = await fetch(`${API_BASE_URL}/weekDetails/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

export const deleteWeekDetail = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/weekDetails/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const updateTimesheet = async (
  id: string,
  payload: Partial<Timesheet>,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/timesheets/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update timesheet");
  }

  return response.json();
};
