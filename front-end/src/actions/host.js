export const hostSetRoom = (payload) => {
  console.log('setting host room')
  return dispatch => {
    dispatch({
      type: 'HOST_SET_ROOM',
      payload
    })
  }
}

export const playerJoined = (payload) => {
  return dispatch => {
    dispatch({
      type: 'HOST_PLAYER_JOINED',
      payload
    })
  }
}

export const setPlayerName = (payload) => {
  return dispatch => {
    dispatch({
      type: 'HOST_SET_PLAYER_NAME',
      payload
    })
  }
}


export const playerLeft = (payload) => {
  return dispatch => {
    dispatch({
      type: 'HOST_PLAYER_LEFT',
      payload
    })
  }
}



