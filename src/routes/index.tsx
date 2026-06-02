import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import TimesheetDetailPage from "../pages/TimesheetDetailsPage";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/timesheet/:weekId",
            element: <TimesheetDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
