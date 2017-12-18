

# App structure
```
/
    /dist -- build files
    /assets -- assets bundled from our build step
        index.css
        bundle.js
    server.js -- bundled server

    /src -- source files
    /app -- our React components
        index.js -- root React component
        browser.js -- root component wrapped with `react-dom/render`
    index.js -- our express server
    template.js -- our basic HTML template
```

npm install --save react prop-types react-dom express

npm install --save-dev babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-0 style-loader css-loader extract-text-webpack-plugin json-loader node-sass sass-loader file-loader url-loader webpack webpack-node-externals
