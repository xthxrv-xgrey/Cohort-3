import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  const config: any = {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (isLib) {
    config.build = {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "EaseUI",
        fileName: (format: string) => `easeui.${format}.js`,
      },
      cssCodeSplit: true,
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    };
  }

  return config;
});
