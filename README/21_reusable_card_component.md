# Card.js #
<!--
import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({ header, subheader, avatar, href, name, children }) {
  return (
    <div className='card bg-light'>
      <h4 className='header-lg center-text'>
        {header}
      </h4>
      <img
        className='avatar'
        src={avatar}
        alt={`Avatar for ${name}`}
      />
      {subheader && (
        <h4 className='center-text'>
          {subheader}
        </h4>
      )}
      <h2 className='center-text'>
        <a className='link' href={href}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
-->

# Popular.js #
<!--
import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'

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
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
  componentDidMount () {
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

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
-->

# Results.js #
<!--
import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    const { playerOne, playerTwo } = this.props

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
      return <p>LOADING</p>
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }

    return (
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    )
  }
}
-->