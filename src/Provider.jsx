import Home from "./routes/Home";
import App from "./App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Provider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/place" element={<Home />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
