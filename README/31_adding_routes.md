# app/index.js #
<!--
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <Route path='/' component={Popular} />
              <Route path='/battle' component={Battle} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
-->

# One caveat that you might not have seen from the above code is that right now if you run the app and you head to the '/battle' path, you’ll notice that both the Battle component and the Popular component are rendered. This is because even though '/' doesn’t match the location exactly, it’s still considered a partial match so the Popular component is rendered. To get around this, you simply need to add an 'exact' prop to the '/' Route to specify that you only want it to match when the location matches exactly.#

# app/index.js #
<!--
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <Route exact path='/' component={Popular} />
              <Route path='/battle' component={Battle} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
-->

# If we now try to access '/battle' route in the browser, we'll get an error 'Cannot GET /battle'. This isn't a react router issue. It has to do with the server that's serving our application, which in this case is webpack dev server.#

# We wanna tell webpack that whenever you get any request instead of trying to handling it yourself, just redirect all requests to the index page. And from there our index page is going to load react and react router. And then react router will handle all routing logic by itself.#

# webpack.config.js #
<!--
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/' // look for routing logic in index.js 
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    devServer: { // dev server will not handle routing logic
        historyApiFallback: true
    }
}
-->