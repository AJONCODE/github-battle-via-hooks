**
  # DON'T DO THIS #
  `onClick={this.updateLanguage(language)}`
    -- as soon as component renders => updateLanguage gets invoked immediately
**

**
  # ALWAYS UPDATE THE STATE VIA `setState` #
  `updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }`
  -- the reason we call 'setState' is to let react know :
    1. we should change the local state of the component.
    2. it should cause a re-render, which is then going to update the UI.
**

**
  # NEVER TRY TO UPDATE STATE LIKE THIS #
  `updateLanguage(selectedLanguage) {
    this.state.selectedLanguage = selectedLanguage;
  }`
  -- this :
    1. may be changing the `selectedLanguage` property on our state.
    2.but because we are not calling the 'setState', we are actulally not
    causing a re-render (hence UI will not be updated).
**

<!--
import React from "react";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All"
    };
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Golang"];
    return (
      <ul className="flex-center">
        {languages.map(language => (
          <li key={language}>
            <button
              className="btn-clear nav-link"
              style={
                language === this.state.selectedLanguage
                  ? { color: "rgb(187, 46, 31)" }
                  : null
              }
              // `onClick={this.updateLanguage(language)}` - as soon as
              // component renders => updateLanguage gets invoked immediately
              onClick={() => this.updateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
-->
