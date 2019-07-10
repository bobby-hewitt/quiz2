import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client';
import {subscribeToPlayerEvents} from './player'
import {subscribeToHostEvents} from './host'
import { hostSetRoom, playerJoined, setPlayerName, playerLeft } from 'actions/host'
import { playerSetRoom } from 'actions/player'


class SocketListener extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (this.props.isHost){
      subscribeToHostEvents(this)
    } else {
      subscribeToPlayerEvents(this)
    }
  }

  render(){
    return(
      <div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  // count: state.counter.count
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push('/' + path),
  hostSetRoom,
  playerSetRoom,
  setPlayerName,
  playerJoined,
  playerLeft
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)