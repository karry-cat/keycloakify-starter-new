import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        keycloakify({
            themeName: "example-corp",
            artifactId: "keycloak-theme-example-corp",
            accountThemeImplementation: "none",
            keycloakVersionTargets: {
                "22-to-25": false,
                "all-other-versions": "keycloak-theme-example-corp.jar"
            }
        })
    ]
});
