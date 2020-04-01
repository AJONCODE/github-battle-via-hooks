import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

function showWarning() {
  return true;
}

function isAuthed() {
    return true
}

class App extends React.Component {
    render() {
        const authed = isAuthed();

        return (
            <React.Fragment>
                <h1>Hello Shikamaru!</h1>
                { showWarning() === true && <h3>warning</h3>}
                { authed ? <h1>Welcome back!<h1> : <h1>Login to see your dashboard</h1> }
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />, // React Element
    document.getElementById('app') // Where to render the Element to
)
