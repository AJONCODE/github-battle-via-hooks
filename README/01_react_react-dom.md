/*
    --Why the `react-dom` package is severed from `react` package?
        - if we look at what `react-dom` does: again it allow us to render a
        react elemenet to the dom
        - react is actually a pretty elegant solution for building UI regardless
        of the environment that its in
        - so in our example, we are buiding react for the dom, so we are
        rendering react for the dom. But other people might render it in other
        environments like IOS app or Android app.
        -- So the reason `react-dom` is severed from `react` itself is because:
        just cause we are using react doesn't necessary means we are rendering
        it to a dom environment or a browser environment.

    -- Why we always capitalize react components (eg., App)?
        - Thats how react tells the difference between a custom react component
        like our App component here and a built-in html element like span or div.

    -- If we want to return adjacent elements, but don't want to change our markup
    we can wrap them inside of <React.Fragment>
*/

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'


function showWarning() {
    return true
}

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Hello Shikamaru!</h1>
                { showWarning() === true && <h3>warning</h3>}
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />, // React Element
    document.getElementById('app') // Where to render the Element to
)
