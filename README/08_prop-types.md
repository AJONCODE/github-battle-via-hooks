propTypes can become very powerful on a long run because whether we install a package from npm or whether we build a component, if we want to figure out what props a specific component takes all we have to do is to look at propTypes.

<!-- 
import React from "react";
import PropTypes from "prop-types";

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

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
};

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
