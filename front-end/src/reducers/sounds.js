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
  interstitial1: new Audio(require('assets/sounds/interstitial1.mp3')),
  interstitial2: new Audio(require('assets/sounds/interstitial2.mp3')),
  interstitial3: new Audio(require('assets/sounds/interstitial3.mp3')),
  interstitial4: new Audio(require('assets/sounds/interstitial4.mp3')),
  alarm: new Audio(require('assets/sounds/alarm.mp3')),
  bell: new Audio(require('assets/sounds/bell.wav')),
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
