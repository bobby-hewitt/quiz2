const initialState = {
  timer:new Audio(require('assets/sounds/timer.wav')),
  go: new Audio(require('assets/sounds/go.wav')),
  bounce: new Audio(require('assets/sounds/bounce.wav')),
  coin: new Audio(require('assets/sounds/coin.wav')),
  correct: new Audio(require('assets/sounds/correct.mp3')),
  wrong: new Audio(require('assets/sounds/wrong.wav')),
  background: new Audio(require('assets/sounds2/background.mp3')),
  start: new Audio(require('assets/sounds2/start.mp3')),
  typing: new Audio(require('assets/sounds2/typing.wav')),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOUND':
    return {
      ...state,
      [action.payload.key]: action.payload.value

    }
    default:
      return state
  }
}
