import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import host from './host'
import player from './player'
import sounds from './sounds'
export default (history) => combineReducers({
  router: connectRouter(history),
  host,
  player,
  sounds,
})

// configureStore.js
