import { useState } from "react";

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

const timesheets = [
  {
    id: 1,
    week: "1 - 5 January, 2024",
    status: "COMPLETED",
    action: "View",
  },
  {
    id: 2,
    week: "8 - 12 January, 2024",
    status: "COMPLETED",
    action: "View",
  },
  {
    id: 3,
    week: "15 - 19 January, 2024",
    status: "INCOMPLETE",
    action: "Update",
  },
  {
    id: 4,
    week: "22 - 26 January, 2024",
    status: "COMPLETED",
    action: "View",
  },
  {
    id: 5,
    week: "28 January - 1 February, 2024",
    status: "MISSING",
    action: "Create",
  },
];
const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(timesheets.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedTimesheets = timesheets.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-900">
          Your Timesheets
        </h1>

        <div className="mt-6 flex gap-4">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none">
            <option>Date Range</option>
          </select>

          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none">
            <option>Status</option>
          </select>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">WEEK #</th>

                <th className="px-6 py-4 font-medium">DATE</th>

                <th className="px-6 py-4 font-medium">STATUS</th>

                <th className="px-6 py-4 text-right font-medium">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTimesheets.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-6 py-5 text-sm text-gray-700">{item.id}</td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {item.week}
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
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      {getActionLabel(item.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none">
            <option>5 per page</option>
          </select>

          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
            <button className="border-r px-4 py-2 text-sm text-gray-600">
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className="border-r px-4 py-2 text-sm"
                // className="border-r px-4 py-2 text-sm text-blue-600"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button className="px-4 py-2 text-sm text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
