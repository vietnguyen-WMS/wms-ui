import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Receiving from "@/pages/receiving";

export const router = createBrowserRouter(
  [
    { path: "/login", element: <Login /> },
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/receiving/*", element: <Receiving /> },
      ],
    },
  ],
  {
    basename: "/",
  }
);
