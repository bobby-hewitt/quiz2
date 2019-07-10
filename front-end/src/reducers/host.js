const initialState = {
  room: null,
  players: [],
  gameState:'welcome'
}

//game states 

// welcome
// question entry
// answer entry 
// question results
// scores 
// 

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
      console.log(action.payload)
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
            console.log('disconnecting', newPlayers[i])
            newPlayers[i].isConnected = false
        
        }
        console.log('disconnecting', newPlayers[i])
      }
      console.log(newPlayers)
      return {
        ...state,
        players: newPlayers
      }
    default:
      return state
  }
}
