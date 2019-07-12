const initialState = {
  timer:new Audio(require('assets/sounds/timer.wav')),
  go: new Audio(require('assets/sounds/go.wav')),
  bounce: new Audio(require('assets/sounds/bounce.wav')),
  coin: new Audio(require('assets/sounds/coin.wav')),
  correct: new Audio(require('assets/sounds/correct.mp3')),
  wrong: new Audio(require('assets/sounds/wrong.wav')),
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
