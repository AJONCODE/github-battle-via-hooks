<!--
// Popular.js
import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa";

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

function ReposGrid({ repos }) {
    return (
        <ul className="grid space-around">
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const { login, avatar_url } = owner;

                return (
                    <li key={html_url} className="repo bg-light">
                        <h4 className="header-lg center-text">
                            #{index + 1}
                        </h4>
                        <img
                            className="avatar"
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2 className="center-text">
                            <a className="link" href={html_url}>{login}</a>
                        </h2>
                        <ul className="card-list">
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
};


export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: "All",
            repos: {},
            error: null
        };
        
        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        ...
    }

    updateLanguage(selectedLanguage) {
        ...
    }

    isLoading() {
       ...
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

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        );
    }
}

-->

<!--
// CSS added onto file index.css
.grid {
  display: flex;
  flex-wrap: wrap;
}

.space-around {
  justify-content: space-around;
}

.header-lg {
  font-size: 35px;
  font-weight: 300;
  margin: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
}

.center-text {
  text-align: center;
}

.link {
  color: rgb(187, 46, 31);
  text-decoration: none;
  font-weight: bold;
}

.card-list {
  margin: 20px 0;
  font-size: 20px;
}

.card-list li {
    display: flex;
    align-items: center;
    margin: 10px;
}

.card-list svg {
    margin-right: 10px;
}

.bg-light {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
  
  .repo {
    margin: 10px 0;
    width: 250px;
    padding: 20px;
  }
  
  .repo a {
    text-decoration: none;
  }
  
  .repo img {
    margin-bottom: 8px;
  }
-->