export const setSound = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SOUND',
      payload
    })
  }
}
