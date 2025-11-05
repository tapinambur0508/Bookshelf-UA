import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";

import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>,
);
