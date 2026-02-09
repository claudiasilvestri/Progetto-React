import { createRoot } from "react-dom/client";
import "./Layout/header.css";
import Root from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Root />
  </AuthProvider>
);
