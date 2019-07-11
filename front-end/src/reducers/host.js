const initialState = {
  room: null,
  players: [],
  gameState:'welcome',
  questionIndex: 0,
  round: 1,
  question: {
    question: '',
    answers: []
  },
}

//game states 

// welcome
// question entry
// answer entry 
// question results
// scores 
// end

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HOST_SET_ROOM':
      return {
        ...state,
        room: action.payload
      }

    case 'HOST_PLAYER_JOINED':
      var newPlayers = Object.assign([], state.players)
      action.payload.isConnected = true
      var disconnectedPlayerFound = false 
      for (var i = 0; i < newPlayers.length; i++ ){
        if (action.payload.prevId === newPlayers[i].id && !newPlayers[i].isConnected){
            console.log('reconnecting existing player')
            newPlayers[i].id = action.payload.id
            newPlayers[i].isConnected = true
            disconnectedPlayerFound = true
        } 
      }
      if (!disconnectedPlayerFound){
        console.log('creating new player')
        action.payload.score = 0
        newPlayers.push(action.payload)
      }
      return {
        ...state,
        players: newPlayers
      }

    case 'HOST_PLAYER_LEFT':
      var newPlayers = Object.assign([], state.players)
      for (var i = 0; i < newPlayers.length; i++){
        if (newPlayers[i].id === action.payload.id){
            newPlayers[i].isConnected = false
        }
      }
      return {
        ...state,
        players: newPlayers
      }

    case 'HOST_SET_GAME_STATE':
      return {
        ...state,
        gameState: action.payload,
      }
    case 'HOST_NEXT_QUESTION':
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      }
     

    case 'HOST_SHOW_HINTS':
      return {
        ...state,
        question: action.payload
      }
    case 'HOST_PLAYER_ANSWER_RECEIVED':
    console.log('in player answered reducer')
      var newPlayers = Object.assign([], state.players)
      for(var i = 0; i < newPlayers.length; i++){
        if (action.payload.id === newPlayers[i].id){
          newPlayers[i].hasSubmitted = true
          newPlayers[i].answer = action.payload.answer
        }
      }
      return {
        ...state,
        players: newPlayers
      }
    case 'HOST_UPDATE_ANSWERS':
    console.log('updating answers', action.payload)
      return {
        ...state,
        question: {
          question: state.question.question,
          answers: action.payload
        }
      }
    case 'HOST_UPDATE_PLAYERS':
      return {
        ...state,
        players: action.payload
      }
    case 'HOST_SET_ROUND':
      return {
        ...state,
        round: action.payload
      }
    case 'HOST_SET_FINAL_PLAYERS':
      return {
        ...state,
        finalPlayers: action.payload
      }
    default:
      return state
  }
}
