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
  choosePlayer: [
    new Audio(require('assets/narration/choosePlayer/1.wav')),
    new Audio(require('assets/narration/choosePlayer/2.wav')),
    new Audio(require('assets/narration/choosePlayer/3.wav')),
    new Audio(require('assets/narration/choosePlayer/4.wav')),
    new Audio(require('assets/narration/choosePlayer/5.wav')),
  ],
  round1: [
    new Audio(require('assets/narration/round1/1.wav')),
    new Audio(require('assets/narration/round1/2.wav')),
    new Audio(require('assets/narration/round1/3.wav')),
    new Audio(require('assets/narration/round1/4.wav')),
    new Audio(require('assets/narration/round1/5.wav')),
    new Audio(require('assets/narration/round1/6.wav')),
    new Audio(require('assets/narration/round1/7.wav')),
  ],
  round2: [
    new Audio(require('assets/narration/round2/1.wav')),
    new Audio(require('assets/narration/round2/2.wav')),
    new Audio(require('assets/narration/round2/3.wav')),
    new Audio(require('assets/narration/round2/4.wav')),
    new Audio(require('assets/narration/round2/5.wav')),
    new Audio(require('assets/narration/round2/6.wav')),
    new Audio(require('assets/narration/round2/7.wav')),
    new Audio(require('assets/narration/round2/8.wav')),
  ],
  round3: [
    new Audio(require('assets/narration/round3/1.wav')),
    new Audio(require('assets/narration/round3/2.wav')),
    new Audio(require('assets/narration/round3/3.wav')),
    new Audio(require('assets/narration/round3/4.wav')),
  ],
  enterTerm: [
    new Audio(require('assets/narration/enterTerm/1.wav')),
    new Audio(require('assets/narration/enterTerm/2.wav')),
    new Audio(require('assets/narration/enterTerm/3.wav')),
    new Audio(require('assets/narration/enterTerm/4.wav')),
  ],
  scores: [
    new Audio(require('assets/narration/scores/1.wav')),
    new Audio(require('assets/narration/scores/2.wav')),
    new Audio(require('assets/narration/scores/3.wav')),
    new Audio(require('assets/narration/scores/4.wav')),
    new Audio(require('assets/narration/scores/5.wav')),
  ],
  termComment: [
    new Audio(require('assets/narration/termComment/1.wav')),
    new Audio(require('assets/narration/termComment/2.wav')),
    new Audio(require('assets/narration/termComment/3.wav')),
    new Audio(require('assets/narration/termComment/4.wav')),
    new Audio(require('assets/narration/termComment/5.wav')),
  ],
  end: [
    new Audio(require('assets/narration/end/1.wav')),
    new Audio(require('assets/narration/end/2.wav')),
    new Audio(require('assets/narration/end/3.wav')),
  ],
  allWrong: [
    new Audio(require('assets/narration/allWrong/1.wav')),
    new Audio(require('assets/narration/allWrong/2.wav')),
    new Audio(require('assets/narration/allWrong/3.wav')),
  ],
  affirmative: [
    new Audio(require('assets/narration/affirmative/1.wav')),
    new Audio(require('assets/narration/affirmative/2.wav')),
    new Audio(require('assets/narration/affirmative/3.wav')),
  ]
  


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
