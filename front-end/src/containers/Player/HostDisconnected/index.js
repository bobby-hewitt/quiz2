import React, { Component } from 'react'
import { Button, ColorText } from 'components'
import './style.scss'

export default class HostDisconnected extends Component {

	onClick(){
		this.props.push('/p')
	}
	render(){
		return(
			<div className="hostDisconnectedContainer">
				<ColorText text="Oh no" />
				<p className="explainer">The host seems to have left.</p>
				<Button text="New game" onClick={this.onClick.bind(this)}/>
			</div>
		)
	}
}