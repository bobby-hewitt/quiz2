import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import host from './host'
import player from './player'
export default (history) => combineReducers({
  router: connectRouter(history),
  host,
  player,
})

// configureStore.js
