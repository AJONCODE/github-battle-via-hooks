/*
    Why does webpack exists?
        - at its core webpack is a module bundler.
        - it examines all of the modules in our application, creates a dependency graph and then intelligently puts all of them together into one or more bundles that our index.html file can reference.

    What problem is webpack solving?
        - when building a javascript application, our javascript code will be seperated by files, and these files may or may not have been actual modules. Then inside our index.html file, we have to include script tags to every javascript file we have. Not only this is tedious, but it is also error prone. There will be issues like typos, forgetting to include a file, but more than that the order of these script tags matter. If we loaded a script that depends on react before loading the react script, things will break.
        - since because webpack intelligently creates bundle pack for us, both of those problems go away.

        -- the module bundling aspect is just one part of webpack. If needed we can also tell webpack to make certain transformations on our modules before adding them to the final bundle ( like transforming sass or less to normal css or modern javascript to ES5 that the browser can understand).

*/

<body>
    ...

    <script src='dist/bundle.js'></script>
</body>

/*
    INSTALLING WEBPACK
        - `npm install webpack webpack-cli --save-dev`
*/

/*
    webpack.config.js

        - naturally, this object is where all of the configuration settings for webpack will go
            -- WEBPACK NEEDS TO KNOW
                1. the entry point of our application
                2. which transformations, if any, to make on our code
                3. the location to put the newly formed bundle(s)
*/

// webpack.config.js
module.exports = {}

/*
    1. The entry point
        - so whenever our application is composed of modules, there's always a single module that is the entry point of our application.
        - example:
            -- index.js
                imports about.js
                imports dashboard.js
                    imports graph.js
                    imports auth.js
                        imports api.js
*/

// webpack.config.js
module.exports = {
    entry: './app/index.js'
}


/*
    2. Transformations with Loaders
        - we need to tell webpack, which transformations to run on our code. To do this we use LOADERS.
        - Loaders work on individual files before or while the bundle is being generated.
            - out of the box, when webpack is building its dependency by examining all of our import and require statements, its only able to process javascript and json files. So out of the box, if we try to import a css or svg file then it will fail. So this is where loaders can help us out.
            - the primary purpose of a loader is to give webpack the ability to process more than just javascript and json files.

        // .svg loader
        `npm install svg-inline-loader --save-dev`

            - all of the information for loaders will go into an array of objects under modules.rules
                -- we need to give 2 pieces of information that we need to give to webpack about each loader in object with keys : type and loader
                    1. test : type of file we need to run loader on ( in our case .svg files )
                    2. file : loader to use on that file ( in our case svg-inline-loader)
*/

// webpack.config.js
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' }
        ]
    }
}

/*
        // .css loader
        `npm install css-loader --save-dev`
        `npm install style-loader --save-dev`
            -- Why style-loader?
                - because of our css-loader, we are able to import css files. However it doesn't mean that those styles are being injected into the dom.
                - What we really want to do, is to import the css file and then have webpack put all of that css in a style tag in the header, so that those styles are active on that page. To do that we can use style-loader.
            -- now that we have 2 loader for our css rule, we change use to be an array
            -- also notice that we have style-loader before css-loader, this is important.
                - Webpack will process those in reverse order. So css-loader will interprete whereever we are importing css files and then style-loader will inject that css into the dom.
*/

// webpack.config.js
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
           { test: /\.svg$/, use: 'svg-inline-loader' },
           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    }
}

/*
        // babel-loader
        `npm install babel-loader`
            -- Why babel-loader?
                - to transform next generation javascript to the javascript up-today, so that browsers can understand (using babel)
*/

// webpack.config.js
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
           { test: /\.svg$/, use: 'svg-inline-loader' },
           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
           { test: /\.js$/, use: 'babel-loader' }
        ]
    }
}

/*
    3. The output
        - where to put the bundle that webpack creates
        - to do that we put output property on our webpack config
            -- here we'll be saying when webpack creates the bundle for us, go ahead and create a dist folder and inside the dist folder put the bundle that we create and name it index_bundle.js
*/

// webpack.config.js
const path = require('path')
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
           { test: /\.svg$/, use: 'svg-inline-loader' },
           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
           { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }
}


/*
    - webpack grabs the entry point located at `./app/index.js`.
    - it examines all of our `import` and `require` statements and creates a dependency graph.
    - webpack starts creating a bundle, whenever if comes across a path we have a loader for, it transforms the code according to that loader then adds  it to the bundle.
    - it takes the final bundle and outputs it at `dist/index_bundle.js`
*/

/*
    Plugins
        - plugins allows us to execute ceratain tasks after the bundle has been created.

        We have our index.html file inside ./app. We can have a <script> tag inside index.html file referencing to ./dist/index_bundle.js file. But that seems kind of wierd because ./dist is an independent thing and we wanna take our dist folder eventually and we want to give it to whatever hosting server we are using, so that it can host our app.

        But our index.html file lives inside of ./app folder and not ./dist folder. We could put index.html inside of ./dist folder, but that seems little wierd because ./dist is being automatically generated for us by webpack.

        So what we want is when webpack builds us our index_bundle.js file, we also want it to create index.html file inside of our ./dist folder and then reference the newly created index_bundle.js file.  

        -- HtmlWebpackPlugin
            - it generates an index.html page, puts it in our /dist folder with a <script> tag that references the newly created bundle.
            - we need to give it a template to use, which will be reference to `./app/index.html`

        `npm install html-webpack-plugin --save-dev`
        -- EnvironmentPlugin
            - if we are using react, we want to set process.env.NODE_ENV to production before we deploy our code. This will tell react to build in production mode, which will strip any development features like warnings.
            - webpack makes this simple by providing a plugin called EnvironmentPlugin, and it comes as part of the webpack namespace, so we actually don't need to download it.
*/

// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
           { test: /\.svg$/, use: 'svg-inline-loader' },
           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
           { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'production'
        })
    ]
}

/*
    Mode
        - whenever we build our app for production, there are few steps we want to tick
            -- set process.env.NODE_ENV to production before we deploy our code. This will tell react to build in production mode, which will strip any development features like warnings.
            -- minifying our code and stripping out comments to reduce the bundle size.

            ( we can set mode property to 'production' or 'development', depending on which environment we are in. So notice we are able to get rid of our environment plugin. The reason for that is by setting mode to production, webpack will automatically set process.env.NODE_ENV to production. It will also minify our code and strip out any warnings. )
*/

// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
           { test: /\.svg$/, use: 'svg-inline-loader' },
           { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
           { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    mode: 'production'
}

/*
    // package.json
        - we can create a script in package.json file to execute webpack
            "scripts": {
                "build": "webpack"
            }
        - now whenever we run `npm run build` from the command line, webpack will execute and create an optimized bundle named index_bundle.js and put it inside of the dist directory.
*/

/*
    PRODUCTION VS DEV modes
        - when we are building for production, we want everything to be as optimized as possible.
        - when we are building for development, the opposite is true.
        - to make it easy to switch between production and development build, we'll have 2 different commands we want to run
            -- npm run build
                - will build our app for PRODUCTION
            -- npm run start
                - will start a development server, which will automatically regenerate our bundle, whenever we make a change to our code.
        - so unlike building for production, when we are developing its all about speed. We don't have to re-run webpack and wait for it to rebuild the dist directory everytime we change out code. (Whenever we change any of our files, now in order to get that change reflected in our build folder or ./dist) folder. We have run : `npm run build` script and then only we can see new changes.)
            -- this is where `webpack-dev-server` package can help us out.
                - webpack-dev-server is a development server for webpack. Instead of generating a dist directory, It will keep track of our files in memory and serve them via local server.
                - webpack-dev-server supports live reload. ( whenever we make a change in our code, webpack-dev-server will quickly compile our code and reload the browser with those changes.)

        `npm install webpack-dev-server --save-dev`

*/

// package.json
...
"scripts": {
    "build": "NODE_ENV='production' webpack",
    "start": "webpack-dev-server"
}
