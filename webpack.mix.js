const mix = require("laravel-mix");
var path = require("path");

mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer")
    ])
    .webpackConfig({
        resolve: {
            extensions: [".js", ".vue", ".json", ".png"],
            alias: {
                "@": path.join(__dirname, "/resources/js")
            },
        }
    });
