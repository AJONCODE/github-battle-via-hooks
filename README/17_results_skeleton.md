<!--
// Results.js
import React from 'react'

export default class Results extends React.Component {
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
-->

<!--
// Popular.js
import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LangaugesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className='repo bg-light'>
            <h4 className='header-lg center-text'>
              #{index + 1}
            </h4>
            <img
              className='avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className='center-text'>
              <a className='link' href={html_url}>{login}</a>
            </h2>
            <ul className='card-list'>
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
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }

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
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
   componentDidMount () {
        /*
            When the component first mounts we are not actually doing anything. We need to fetch the api as soon as 
            the component is mounted 
        */
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }
  isLoading() {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
-->

<!--
// index.css
html,
body,
#app {
  margin: 0;
  height: 100%;
  width: 100%;
}

body {
  font-family: apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Selvetica Neue, sans-serif;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-clear {
  border: none;
  background: transparent;
}

.nav-link {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

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

.header-sm {
  font-size: 28px;
  font-weight: 300;
  margin: 10px;
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

.instructions-container {
  margin: 100px 0;
}

.container-sm {
  width: 80%;
  margin: 0 auto;
}

.battle-instructions {
  padding: 0;
  font-size: 25px;
}

.battle-instructions li {
  flex: 1;
  min-width: 300px;
}

.battle-instructions svg {
  padding: 40px;
  border-radius: 3px;
}

column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.player {
  flex: 1;
  margin: 0 20px;
  padding: 10px;
}

.player-label {
  font-size: 20px;
  margin: 5px 0;
  font-weight: 300;
}

.player-inputs input {
  padding: 8px;
  font-size: 16px;
  flex: 2;
  border-radius: 3px;
  border: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
}

.player-inputs .input-light {
  background: rgba(0, 0, 0, 0.02);
}

.player-inputs button {
  flex: 1;
  margin-left: 10px;
}

.btn {
  padding: 10px;
  text-decoration: uppercase;
  letter-spacing: 0.25em;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  max-width: 200px;
}

.dark-btn {
  color: #e6e6e6;
  background: #141414;
}

.dark-btn:disabled {
  background: #f2f2f2;
  color: #c7c7c7;
}

.players-container {
  margin: 100px 0;
}

.avatar-small {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.player-info {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 20px;
  padding: 10px;
}

.player-info .link {
  margin-left: 10px;
}

.btn-space {
  margin: 40px auto;
}

-->