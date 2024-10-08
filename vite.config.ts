import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/text-writer/",
	plugins: [react()],
	resolve: {
		alias: {
			"@assets": "/src/assets",
			"@components": "/src/components",
		},
	},
});
