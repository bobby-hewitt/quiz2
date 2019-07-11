import React, { Component } from 'react'
import './style.scss'
import { ColorText, Button } from 'components'
import { startGame } from 'containers/SocketListener/player'

export default class End extends Component {

	onClick(){
		startGame(this.props.room)
	}
	render(){
		return(
			<div className="endContainer">
				<ColorText text="That's all folks" />
				<Button text="Play again!" onClick={this.onClick.bind(this)}/>
			</div>
		)
	}
}