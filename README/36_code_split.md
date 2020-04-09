# npm install --save-dev @babel/plugin-syntax-dynamic-import #

# .babelrc #
<!--
/*
    - transform jsx into normal javascript
    - transform some of modern javascript into regular javascript (that the
    browser can understand)

    -- presets
        - presets are what's going to define the types of transformations we
        want to make with babel

        -- @babel/preset-env
            - this preset allows us to target specific environments (browsers)

        -- @babel/preset-react
            - this preset is going to take our JSX, transform it to normal
            javascript

    -- plugins
        -- @babel/plugin-proposal-class-properties
            - when babel transforms react as well as our modern javascript code, 
            its also gonna give us import for the class properties
        -- @babel/plugin-syntax-dynamic-import
            - its gonna allow us to have dynamic imports in our application

*/

{
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
-->

# app/index.js #
<!--
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <React.Suspense fallback={<Loading />} >
                <Switch>
                  <Route exact path='/' component={Popular} />
                  <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
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