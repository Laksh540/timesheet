// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext.tsx";
// import "@fontsource/inter";
import "@fontsource/inter/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
