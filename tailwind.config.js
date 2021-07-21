const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    purge: [
        "./node_modules/vue-tailwind/dist/*.js",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans]
            }
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            blue: colors.blue,
            white: colors.white,
            gray: colors.trueGray,
            teal: colors.teal,
            emerald: colors.emerald,
            lime: colors.lime,
            green: colors.green,
            cyan: colors.cyan,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            orange: colors.orange
        }
    },

    variants: {
        extend: {
            opacity: ["disabled"],
            cursor: ["disabled"]
        }
    },

    plugins: [require("@tailwindcss/forms")]
};
