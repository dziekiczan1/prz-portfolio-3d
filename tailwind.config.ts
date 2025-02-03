import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["var(--font-dmSans)", "sans-serif"],
                orbitron: ["var(--font-orbitron)", "sans-serif"],
            },
            boxShadow: {
                input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
            },
            keyframes: {
                scaleBounce: {
                    '0%, 100%': { transform: 'translateX(-50%) scale(1)' },
                    '50%': { transform: 'translateX(-50%) scale(1.1)' },
                },
            },
            animation: {
                'scale-bounce': 'scaleBounce 2s ease-in-out infinite',
            },
        }
    },
    plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: PluginAPI) {
    const allColors = flattenColorPalette(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

export default config;