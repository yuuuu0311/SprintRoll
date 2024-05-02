/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from "tailwind-scrollbar";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            keyframes: {
                progressWiggle: {
                    "0%": { transform: "scaleX(0.99)" },
                    "100%": { transform: "scaleX(1)" },
                },
            },

            animation: {
                progressWiggle:
                    "progressWiggle 3s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [tailwindScrollbar],
};
