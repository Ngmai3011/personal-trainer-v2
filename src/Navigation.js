import {Outlet, createBrowserRouter, RouterProvider} from "react-router-dom";
import Calendar from "./components/Calendar";
import Customers from "./components/Customers";
import Statistics from "./components/Statistics";
import Trainings from "./components/Trainings";
import Home from "./Home";
import Navbar from "./Navbar";

const PageLayout = () => (
  <>
    <Navbar /> <Outlet />
  </>
);

export default function Navigation() {
  const router = createBrowserRouter([
    {
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "customers",
          element: <Customers />,
        },
        {
          path: "trainings",
          element: <Trainings />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
