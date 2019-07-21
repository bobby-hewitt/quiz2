export const playerSetSelf = (payload) => {
  return dispatch => {
    dispatch({
      type: 'PLAYER_SET_SELF',
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

export const setLoading = (payload) => {
  return dispatch => {
    dispatch({
      type: 'PLAYER_SET_LOADING',
      payload
    })
  }
}

export const setLikes = (payload) => {
  console.log('setting liokes')
  return dispatch => {
    dispatch({
      type: 'PLAYER_SET_LIKES',
      payload
    })
  }
}



