import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client';
import {subscribeToPlayerEvents} from './player'
import {subscribeToHostEvents} from './host'
import { hostSetRoom, playerJoined, playerLeft, showHints, playerAnswerReceived, updateAnswers } from 'actions/host'
import { playerSetRoom, playerSetSelf, setLoading } from 'actions/player'


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
  gameState: state.host.gameState,
  playerRoom: state.player.room,
  players: state.host.players,
  question: state.host.question,
  questionIndex: state.host.questionIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push( path),
  hostSetRoom,
  playerSetSelf,
  playerJoined,
  setLoading,
  updateAnswers,
  playerLeft,
  playerAnswerReceived,
  showHints
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)