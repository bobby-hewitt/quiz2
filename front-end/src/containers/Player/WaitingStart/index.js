import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReactComponent as User } from 'assets/images/svg/user.svg'
import './style.scss'
import { Button, ColorText } from 'components'
import { startGame } from 'containers/SocketListener/player'


class WaitingStart extends Component {

	onClick(){
		startGame(this.props.room)
		// this.props.push('/p/select-team')
	}
	render(){
		return(
			<div className="playerWaitingStartContainer">
			<ColorText text="Sit tight" letterStyle={{fontSize:'50px'}}/>
				<h4 className="title">Let us know when everyone is in.</h4>
				<Button text="Everybody's in" onClick={this.onClick.bind(this)}/>
			</div>

		)
	}
}

const mapStateToProps = state => ({
	room: state.player.room
})

const mapDispatchToProps = dispatch => bindActionCreators({
	//
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingStart)