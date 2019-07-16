import React, { Component } from 'react'
import './style.scss'
import { ColorText, Button } from 'components'
import { restartGame } from 'containers/SocketListener/player'

export default class End extends Component {

	onClick(){
		restartGame(this.props.room)
	}
	render(){
		return(
			<div className="endContainer">
				<ColorText text="That's it" letterStyle={{fontSize:'50px'}}/>
				<Button text="Play again!" onClick={this.onClick.bind(this)}/>
			</div>
		)
	}
}