\*\*

# WHY ARE WE NOT CATCHING ERRORS IN '.api.js'

The reason that we are not catching the error in here (i.e., api.js) is because we can't really do anything as far as ui is concerned from here.
So what we do is we throw an error and we invoke the function, we can add our '.catch' onto there. And if there's a problem, then we'll be in the
UI layer and we can then update the UI based on that problem.
\*\*

<!--
// api.js

export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
        if(!data.items) {
            throw new Error(data.message)
        }

        return data.items
    })
}
-->

<!--
// Popular.js
import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

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
            selectedLanguage: "All",
            repos: null,
            error: null
        };

        /*
            if we comment `this.updateLanguage = this.updateLanguage.bind(this);`
                -- we'll get `Uncaught TypeError: Cannot read property 'setState' of undefined`.
                And the reason for this is because when our `updateLanguage` method is invoked,
                because it's being passed as a reference to the `LanguagesNav` it is technically
                invoked there (i.e., inside LanguagesNav). So the `this` keyword in `updateLanguage`
                function is going to be same as to the `this` keyword in `LanguagesNav` which is
                undefined.
        */
        /*
            if we are using `this.updateLanguage = this.updateLanguage.bind(this);`
                -- we are making sure of the fact that when `updateLanguage` is called, then the `this`
                keyword is going to refer to the component instance of `Popular` and not of `LanguagesNav`.
        */
        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        /*
            When the component first mounts we are not actually doing anything. We need to fetch the api as soon as
            the component is mounted
        */
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(selectedLanguage) {
        /*
            the reason we are updating repos and error state to null is because we will be using these to show
            loading screen ( `(this.state.repos && this.state.error)` => loading)
        */
        this.setState({
            selectedLanguage,
            repos: null,
            error: null
        });

        /*
            here we are catching error while fetching api endpoint
        */
        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null,
            }))
            .catch(() => {
                console.warn('Error fetching repos: ', error)

                this.setState({
                    error: `There was an error fetching the repositories.`
                })
            })
    }

    isLoading() {
        return this.state.repos === null && this.state.error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={this.state.selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING...</p>}

                {error && <p>{error}</p>}

                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        );
    }
}
-->
