import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Provider from "./Provider.jsx";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <h1>Error we</h1>,
//   },
//   {
//     path: "/place",
//     element: <Home />,
//   },
//   {
//     path:"*",
//     element: <Navigate to={"/"} />
//   }
// ]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider />
    {/* <RouterProvider router={router}/> */}
  </React.StrictMode>
);
