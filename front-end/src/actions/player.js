export const playerSetRoom = (payload) => {
  return dispatch => {
    dispatch({
      type: 'PLAYER_SET_ROOM',
      payload
    })
  }
}

export const toggleUserSelect = (payload) => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_USER_SELECT',
      payload
    })
  }
}



