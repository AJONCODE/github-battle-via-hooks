if we comment `this.updateLanguage = this.updateLanguage.bind(this);`
    -- we'll get `Uncaught TypeError: Cannot read property 'setState' of undefined`. 
    And the reason for this is because when our `updateLanguage` method is invoked, 
    because it's being passed as a reference to the `LanguagesNav` it is technically 
    invoked there (i.e., inside LanguagesNav). So the `this` keyword in `updateLanguage` 
    function is going to be same as to the `this` keyword in `LanguagesNav` which is 
    undefined.

if we are using `this.updateLanguage = this.updateLanguage.bind(this);`
    -- we are making sure of the fact that when `updateLanguage` is called, then the `this` 
    keyword is going to refer to the component instance of `Popular` and not of `LanguagesNav`.

<!-- 
import React from "react";

function LanguagesNav({ selected, onUpdateLanguage }) {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Golang"];
    return (
        <ul className="flex-center" > {
            languages.map(language => (
                <li key={language} >
                    <button className="btn-clear nav-link"
                        style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
                        // `onClick={this.updateLanguage(language)}` - as soon as
                        // component renders => updateLanguage gets invoked immediately
                        onClick={() => onUpdateLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
            ))
        }
        </ul>
    );
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: "All"
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        });
    }

    render() {
        const { selectedLanguage } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={this.state.selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
            </React.Fragment>
        );
    }
} 
-->
