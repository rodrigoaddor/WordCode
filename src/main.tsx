import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store, AppState } from './store'
import Menu from './screen/menu'
import Game from './screen/game'

import './main.sass'
import { Route, Router, ScreenName } from './components/router'
import { appear, ripple, slide } from './transitions'
import { TeamAction, Team } from './store/team'
import WordsScreen from './screen/words'
import { jsonObj } from './utils'

const savedTeams = localStorage.getItem('teams')
if (savedTeams) {
  store.dispatch({
    type: TeamAction.SetTeams,
    payload: (JSON.parse(savedTeams) as jsonObj).map((team: string) => Team.fromJson(team))
  })
}

store.subscribe(() => {
  const state: AppState = store.getState()
  localStorage.setItem('teams', JSON.stringify(state.teams.teams.map(team => Team.toJson(team))))
})

ReactDOM.render(
  //@ts-ignore idk
  <Provider store={store}>
    <Router initialScreen={ScreenName.Menu}>
      <Route screen={ScreenName.Menu} inTransition={appear}>
        <Menu />
      </Route>
      <Route screen={ScreenName.Playing} inTransition={ripple}>
        <Game />
      </Route>
      <Route screen={ScreenName.Words} inTransition={slide} outTransition={slide}>
        <WordsScreen />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
