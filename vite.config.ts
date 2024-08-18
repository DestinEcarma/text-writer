import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/<REPO>/",
	plugins: [react()],
	resolve: {
		alias: {
			"@assets": "/src/assets",
			"@components": "/src/components",
		},
	},
});
