import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Developers from "./components/Developers";
import Embed from "./components/Embed";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar.jsx";
import Create from "./components/Create.jsx";
import Callback from "./components/Callback.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/developers", element: <Developers /> },
  { path: "/stats", element: <Stats /> },
  { path: "/embed", element: <Embed /> },
  { path: "/create", element: <Create /> },
  { path: "/callback", element: <Callback /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Navbar></Navbar>
    <RouterProvider router={router}></RouterProvider>
  </>
);
