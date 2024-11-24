const path = require('path'); //We write node.js here

module.exports = {
    mode: 'development', // Set mode to 'development'
    entry:'./src/app.ts', // the entry that the webpack will start
    output: {
        filename: 'bundle.js', // here is the js file which will b e produced at the end (You put whatever name you want)
        path : path.resolve(__dirname, 'dist'), // here you specify the path where the file will be written at the end. This should be the same with the tsconfig.json to avoid errors, ('outDir':'./dist')
        publicPath: '/dist/', // Serve files from /dist/
    },
    devtool: 'inline-source-map',
    //config for the dev server
    devServer: {
        static: [
          {
            directory: path.join(__dirname, 'public'), // Serve the static files from the public folder
            publicPath: '/', // Serve files at the root URL path
          },
          {
            directory: path.join(__dirname, 'dist'), // Serve the dist folder as well (for bundle.js)
            publicPath: '/dist/', // Make bundle.js available under /dist/
          },
        ],
        port: 8080, // Port number
        historyApiFallback: true, // Helps with single-page apps to fallback to index.html
      },

    //now we will tell webpack what to do with the entry (app.ts)
    //module is a file at the end and now we will tell what to do with that file
    module: {
        rules: [
            {
                test: /\.ts$/, // here we tell to test any file with that extension
                use : 'ts-loader', // here we specify that any ts file ahould be handled by ts-loader
                exclude : /node_modules/ // here we tell weback not to look at node_modules
            }
        ]
    },
     //now we will tell webpack which file extensions it adds to the imports it finds
    resolve:{
        extensions: ['.ts','.js']
    }

};