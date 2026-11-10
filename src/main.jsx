import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/react_router_navigation_2">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
