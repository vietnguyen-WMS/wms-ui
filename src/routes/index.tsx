import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "@/layouts/AppLayout";

// Importing the main application page
import Login from "@/pages/login";
import Home from "@/pages/home";
import About from "@/pages/about";

// Importing the remote page
import Receiving from "@/pages/receiving";

export const router = createBrowserRouter(
  [
    { path: "/login", element: <Login /> },
    {
      element: (
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/receiving/*", element: <Receiving /> },
      ],
    },
  ],
  {
    basename: "/",
  }
);
