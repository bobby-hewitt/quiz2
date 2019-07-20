const initialState = {
  room: null,
  name: '',
  id: null,
  loading:false,
  answers: [],
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
     case 'PLAYER_SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
