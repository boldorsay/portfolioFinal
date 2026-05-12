import { defineConfig } from "vite";

/** Réécrit /p/... vers / pour que l’app charge puis lise le slug dans location.pathname */
function portfolioDeepLinkFallback() {
  const rewrite = (req, _res, next) => {
    if (req.method !== "GET" || !req.url) return next();
    const pathname = req.url.split("?")[0];
    if (pathname.startsWith("/p/") && pathname.length > 3) {
      const q = req.url.includes("?") ? "?" + req.url.split("?").slice(1).join("?") : "";
      req.url = "/" + q;
    }
    next();
  };
  return {
    name: "portfolio-deep-link-fallback",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [portfolioDeepLinkFallback()],
});
