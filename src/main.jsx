import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Trips from "./components/Trips.jsx";
import Guides from "./components/Guides.jsx";
import TripDetails from "./components/TripDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/trips", element: <Trips /> },
      { path: "/guides", element: <Guides /> },
      { path: "/trips/:id", element: <TripDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
