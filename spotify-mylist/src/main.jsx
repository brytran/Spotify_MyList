import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Developers from "./components/Developers";
import Embed from "./components/Embed";
import StatsSelection from "./components/StatSelection.jsx";
import Navbar from "./components/Navbar.jsx";
import Create from "./components/Create.jsx";
import Callback from "./components/Callback.jsx";
import Stats from "./components/Stats.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/developers", element: <Developers /> },
  { path: "/statsselect", element: <StatsSelection /> },
  { path: "/embed", element: <Embed /> },
  { path: "/create", element: <Create /> },
  { path: "/callback", element: <Callback /> },
  { path: "/stats", element: <Stats /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Navbar></Navbar>
    <RouterProvider router={router}></RouterProvider>
  </>
);
