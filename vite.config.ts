import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
//
// Two build modes:
//   `vite build`                → multi-file build with code splitting (web deployment)
//   `vite build --mode singlefile` → single HTML file for offline use
//
// `base: './'` makes all asset URLs relative — works from file://, GitHub Pages,
// Netlify, Vercel, or any custom domain.
export default defineConfig(({ mode }) => {
  const isSingleFile = mode === "singlefile";

  return {
    base: "./",
    plugins: [
      react(),
      tailwindcss(),
      ...(isSingleFile ? [viteSingleFile()] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      assetsInlineLimit: isSingleFile ? 100000000 : 4096,
      cssCodeSplit: !isSingleFile,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          inlineDynamicImports: isSingleFile,
          ...(isSingleFile ? {} : {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-gsap': ['gsap'],
              'vendor-icons': ['lucide-react'],
              'vendor-three': ['three'],
            },
          }),
        },
      },
    },
  };
});
