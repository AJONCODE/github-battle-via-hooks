import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import Popular from './components/Popular'
import Battle from './components/Battle'

function showWarning() {
    return true
}

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                {/* <Popular /> */}
                <Battle />
            </div>
        )
    }
}

ReactDOM.render(
    <App />, // React Element
    document.getElementById('app') // Where to render the Element to
)
