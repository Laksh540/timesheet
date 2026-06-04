import { useEffect, useState } from "react";
import type { Timesheet } from "../types/timesheet";
import { getTimesheets } from "../api/timesheet";
import { useNavigate } from "react-router-dom";
import { TimesheetStatus } from "../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "INCOMPLETE":
      return "bg-yellow-100 text-yellow-700";

    case "MISSING":
      return "bg-pink-100 text-pink-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getActionLabel = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "View";

    case "INCOMPLETE":
      return "Update";

    case "MISSING":
      return "Add";

    default:
      return "-";
  }
};

const DashboardPage = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;

  const navigate = useNavigate();

  // const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredTimesheet = timesheets.filter((t) => {
    // status filter
    const matchesStatus = status === "" || t.status === status;

    // date range filter
    let matchesDateRange = true;

    if (startDate && endDate) {
      // replace these fields with your actual week start/end fields
      const weekStart = new Date(t.weekStart);
      const weekEnd = new Date(t.weekEnd);

      // overlap logic
      matchesDateRange = weekStart <= endDate && weekEnd >= startDate;
    }

    return matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredTimesheet.length / itemsPerPage);

  const paginatedTimesheets = filteredTimesheet.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        setLoading(true);

        const data = await getTimesheets();

        setTimesheets(data);
      } catch (error) {
        console.error("Failed to fetch timesheets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimesheets();
  }, []);

  //   useEffect(() => {
  //   setCurrentPage(1);
  // }, [status, dateRange]);

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  console.log("date range", dateRange);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold text-gray-900">Your Timesheets</h1>

      <div className="my-6 flex gap-4">
        {/* <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none">
          <option>Date Range</option>
        </select> */}
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateRangeChange}
          isClearable
          placeholderText="Select date range"
          className="w-55 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
          calendarClassName="rounded-xl border shadow-lg"
        />

        <select
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
          onChange={handleStatusChange}
        >
          <option value={""}>All Status</option>
          <option value={TimesheetStatus.COMPLETED}>Completed</option>
          <option value={TimesheetStatus.INCOMPLETE}>Incomplete</option>
          <option value={TimesheetStatus.MISSING}>Missing</option>
        </select>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-gray-500">Loading timesheets...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      Week #
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedTimesheets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">
                            No timesheets found
                          </p>

                          <p className="text-sm text-gray-500">
                            Try changing the applied filters.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedTimesheets.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-5 text-sm text-gray-700">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {item.weekLabel}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => navigate(`/timesheet/${item.id}`)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            {getActionLabel(item.status)}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <select
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
        </select>
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
          {paginatedTimesheets.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 ">
              <button
                className="border-r px-4 py-2 text-sm text-gray-600 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <div className="flex items-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`border-r px-4 py-2 text-sm ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                className="px-4 py-2 text-sm text-gray-600 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
