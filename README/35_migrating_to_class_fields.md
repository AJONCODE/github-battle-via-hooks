# .babelrc #
<!--
/*
    - transform jsx into normal javascript
    - transform some of modern javascript into regular javascript (that the
    browser can understand)

    -- presets
        - presets are what's going to define the types of transformations we
        want to make with babel

        -- @babel/preset-env
            - this preset allows us to target specific environments (browsers)

        -- @babel/preset-react
            - this preset is going to take our JSX, transform it to normal
            javascript

    -- plugins
        -- @babel/plugin-proposal-class-properties
            - when babel transforms react as well as our modern javascript code, 
            its also gonna give us import for the class properties

*/
{
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
-->

# app/index.js #
<!--
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Results from './components/Results'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
-->

# app/components/Battle.js #
<!--
import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions () {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='instructions-container'>
          <h1 className='center-text header-lg'>
            Instructions
          </h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two Github users</h3>
              <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>Battle</h3>
              <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>See the winners</h3>
              <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  )
}

class PlayerInput extends React.Component {
  state = {
    username: ''
  }
  handleSubmit = (event) => {
    event.preventDefault()

    this.props.onSubmit(this.state.username)
  }
  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                id='username'
                className={`input-${theme}`}
                placeholder='github username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                type='submit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='column player'>
          <h3 className='player-label'>{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className='player-info'>
              <img
                className='avatar-small'
                src={`https://github.com/${username}.png?size=200`}
                alt={`Avatar for ${username}`}
              />
              <a
                href={`https://github.com/${username}`}
                className='link'>
                  {username}
              </a>
            </div>
            <button className='btn-clear flex-center' onClick={onReset}>
              <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  }
  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    })
  }
  handleReset = (id) => {
    this.setState({
      [id]: null
    })
  }
  render() {
    const { playerOne, playerTwo } = this.state

    return (
      <React.Fragment>
        <Instructions />

        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {playerOne === null
              ? <PlayerInput
                  label='Player One'
                  onSubmit={(player) => this.handleSubmit('playerOne', player)}
                />
              : <PlayerPreview
                  username={playerOne}
                  label='Player One'
                  onReset={() => this.handleReset('playerOne')}
                />
            }

            {playerTwo === null
              ? <PlayerInput
                  label='Player Two'
                  onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                />
              : <PlayerPreview
                  username={playerTwo}
                  label='Player Two'
                  onReset={() => this.handleReset('playerTwo')}
                />
            }
          </div>


          {playerOne && playerTwo && (
            <Link
              className='btn dark-btn btn-space'
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    )
  }
}
-->

# app/components/Hover.js #
<!--
import React from 'react'

export default class Hover extends React.Component {
  state = { hovering: false }
  mouseOver = () => this.setState({ hovering: true })
  mouseOut = () => this.setState({ hovering: false })
  render () {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}
-->

# app/components/Loading.js #
<!--
import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default class Loading extends React.Component {
  state = { content: this.props.text }
  componentDidMount () {
    const { speed, text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }))
    }, speed)
  }
  componentWillUnmount () {
    window.clearInterval(this.interval)
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.content}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
-->

# app/components/Popular.js #
<!--
import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text="Github username">
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
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
            </Card>
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
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null,
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage = (selectedLanguage) => {
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
  isLoading = () => {
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

        {this.isLoading() && <Loading text='Fetching Repos' />}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
-->

# app/components/Results.js #
<!--
import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function ProfileList ({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }
  componentDidMount () {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        })
      })
  }
  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <Loading text='Battling' />
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile}/>
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile}/>
          </Card>
        </div>
        <Link
          to='/battle'
          className='btn dark-btn btn-space'>
            Reset
        </Link>
      </React.Fragment>
    )
  }
}
-->