import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import host from './host'
import player from './player'
import sounds from './sounds'
import eg from './eg'
export default (history) => combineReducers({
  router: connectRouter(history),
  dev: eg,
  host,
  player,
  sounds,
  
})

// configureStore.js
