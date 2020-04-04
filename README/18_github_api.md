**
# DEVELOPERS SETTING #
# https://github.com/settings/developers #
(if any issue occurs follow these two steps)
1. New OAuth App
2. After registering the application, use the generated id and secret id in the request api
**

<!--
// api.js
const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`

function getProfile(username) {
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMsg(profile.message, username))
            }

            return profile
        })
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMsg(repos.message, username))
            }

            return repos
        })
}

function getStarCount(repos) {
    /*
        - reduce ?
          for each repo iteration count will be the result for count starting from 0. 
          And in every iteration count will add stargazers_count (from repos in every iteration)
    */
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}


function calculateScore(followers, repos) {
    return followers + getStarCount(repos)
}

function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

export function battle(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }

            return data.items
        })
}

/*
    The reason that we are not catching the error in here (i.e., api.js) is because we can't really do anything as far as ui is concerned from here.
    So what we do is we throw an error and we invoke the function, we can add our '.catch' onto there. And if there's a problem, then we'll be in the
    UI layer and we can then update the UI based on that problem.
*/
-->

<!--
// Results.js
import React from 'react'
import { battle } from '../utils/api'

export default class Results extends React.Component {
  componentDidMount () {
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo ])
      .then((players) => {
        console.log('data: ', players)
      })
  }
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