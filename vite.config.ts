import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((props) => {
    const env = loadEnv(props.mode, process.cwd());
    const envWithProcessPrefix = {
        "process.env": `${JSON.stringify(env)}`,
    };

    return {
        plugins: [react(), tsconfigPaths()],
        define: envWithProcessPrefix,
    };
});
