import React from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      {/* <Toaster
        position="top-right"
        offset={{
          top: "10vh",
          right: "32px",
        }}
        richColors
        expand={true}
      /> */}
      <Toaster
        position="top-right"
        offset={{
          top: "10vh",
          right: "2rem",
        }}
        expand={false}
        richColors={false}
        duration={2500}
        visibleToasts={3}
        toastOptions={{
          classNames: {
            toast:
              "rounded-3xl border border-border bg-card text-foreground shadow-lg px-5 py-4",
            title: "font-medium text-sm",
            description: "text-xs text-muted-foreground",
            actionButton:
              "bg-primary text-primary-foreground rounded-full px-3 py-1",
            cancelButton:
              "bg-secondary text-secondary-foreground rounded-full px-3 py-1",
          },
        }}
      />
      <AppRoutes />
    </>
  );
};

export default App;
