# app/contexts/theme.js #
<!--
import React from 'react'

const { Consumer, Provider } = React.createContext()

export const ThemeConsumer = Consumer
export const ThemeProvider = Provider
-->

# app/index.js #
<!--
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'

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
      <ThemeProvider value={this.state}>
        <div className='container'>
          <Battle />
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
-->

# Just like React re-renders with prop changes, whenever the data passed to value changes, React will re-render every component which used Consumer to subscribe to that data. The way in which React knows if the data changes is by using “reference identity” (which is kind of a fancy way of saving oldObject === newObject). #

# If we set up (value={{}}), we’re passing a new object to 'value' every time that App re-renders. What this means is that when React checks if the data passed to 'value' has changed, it’ll always think it has since we’re always passing in a new object. As a result of that, every component which used Consumer to subscribe to that data will re-render as well, even if nothing changed. #

# Instead of passing a new object to 'value' every time, we want to give it a reference to an object it already knows about #