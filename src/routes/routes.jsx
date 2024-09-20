// routes.jsx
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/dashboardLayout";
import RecordList from "../components/recordList";
import RecordForm from "../components/recordForm";
import RecordDetail from "../components/recordDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
      {
        path: "/record",
        element: <RecordList />,
      },
      {
        path: "/add-record",
        element: <RecordForm />,
      },
      {
        path: "/edit-record/:id",
        element: <RecordForm />,
        loader: async ({ params }) => {
          return await fetch(
            `https://health-care-mu-five.vercel.app/health-records/${params.id}`
          );
        },
      },
      {
        path: "/details/:id",
        element: <RecordDetail />,
        loader: async ({ params }) => {
          return await fetch(
            `https://health-care-mu-five.vercel.app/health-records/${params.id}`
          );
        },
      },
    ],
  },
]);
