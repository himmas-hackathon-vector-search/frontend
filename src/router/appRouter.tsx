import { Navigate, createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/Home";
import QAPage from "../pages/QA";
import DatabasePage from "../pages/Database";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "qa",
        element: <QAPage />,
      },
      {
        path: "database",
        element: <DatabasePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
