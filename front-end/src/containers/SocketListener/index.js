import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client';
import {subscribeToPlayerEvents} from './player'
import {subscribeToHostEvents} from './host'
import { hostSetRoom, playerJoined, playerLeft, showHints, playerAnswerReceived, updateAnswers, setViewResponses, setGameState, setScreenLoadingState } from 'actions/host'
import { playerSetRoom, playerSetSelf, setLoading } from 'actions/player'
import { setSound } from 'actions/sounds'

class SocketListener extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (this.props.isHost){
      this.props.sounds.typing.play()
      subscribeToHostEvents(this)
    } else {
      subscribeToPlayerEvents(this)
    }
     
    // this.props.sounds.typing.play()
    // this.props.sounds.typing.addEventListener('canplaythrough', () => {
    //     console.log('should play')
    //     this.props.sounds.typing.play()
    //     this.props.sounds.typing.loop = true
    // })
    
    // let refs = Object.keys(this.refs)
    // for (var i = 0; i < refs.length; i++){
    //     this.addListener(refs[i])

    // }
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
  sounds: state.sounds,
  hostRoom: state.host.room
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push( path),
  hostSetRoom,
  playerSetSelf,
  setViewResponses,
  setScreenLoadingState,
  playerJoined,
  setGameState,
  setLoading,
  updateAnswers,
  setSound,
  playerLeft,
  playerAnswerReceived,
  showHints
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketListener)