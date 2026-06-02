// fetch timesheets
// add task
// edit task
// delete task

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTimesheets = async () => {
  const response = await fetch(
    `${BASE_URL}/timesheets`
  );

  return response.json();
};