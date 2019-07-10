const initialState = {
  room: null,
  name: '',
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_SET_SELF':
      return {
        ...state,
        name: action.payload.playerData.name,
        id: action.payload.playerData.id,
        room: action.payload.room,
      }
    default:
      return state
  }
}
