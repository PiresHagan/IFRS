import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import router from "./routes";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{}}>
      <StyleProvider hashPriority="high">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>
);
