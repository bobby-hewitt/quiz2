const initialState = {
  room: null,
  teamMembers: [],
  usersSelected: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_SET_ROOM':
    console.log('plater setting room', action.payload)
      return {
        ...state,
        room: action.payload,
      }
    case 'PLAYER_SET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case 'SET_TEAM_MEMBERS':
      return {
        ...state,
        teamMembers: state.teamMembers,
      }
    case 'TOGGLE_USER_SELECT':
      
      var newUsers = Object.assign([], state.users)
      newUsers[action.payload].isSelected = !newUsers[action.payload].isSelected
      var numSelected = 0
      for (var i = 0; i < newUsers.length; i++){
        if (newUsers[i].isSelected) numSelected++ 
      }
      return {
        ...state,
        users: newUsers,
        usersSelected: numSelected,
      }
    default:
      return state
  }
}
