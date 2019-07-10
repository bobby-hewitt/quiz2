const initialState = {
  room: null,
  teams: [],
  players: []
}

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
      newPlayers.push(action.payload)
      
      return {
        ...state,
        players: newPlayers
      }
    case 'HOST_SET_PLAYER_NAME':
      var newPlayers = Object.assign([], state.players)
      for (var i = 0; i < newPlayers.length; i++){
        if (newPlayers[i].id === action.payload.id){
          newPlayers[i].name = action.payload.name
          newPlayers[i].image = require(`assets/images/png/monsters/monster${i}.png`)

        }
      }
    return{
      ...state,
      players: newPlayers
    }

    case 'HOST_PLAYER_LEFT':
      var newPlayers = Object.assign([], state.players)
      for (var i = 0; i < newPlayers.length; i++){
        if (newPlayers[i].id === action.payload.id){
          
          if (!newPlayers[i].name){
            newPlayers.splice(i, 1)
          } else {
            newPlayers[i].isConnected = false
          }
        }
      }
      return {
        ...state,
        players: newPlayers
      }
    default:
      return state
  }
}
