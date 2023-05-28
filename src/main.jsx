import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error we</h1>,
  },
  {
    path: "/:user",
    element: <Home />,
  },
  {
    path:"*",
    element: <Navigate to={"/"} />
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
