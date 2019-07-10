import React, { Component } from 'react'
import './style.scss'
import { ReactComponent as Back } from 'assets/images/svg/back.svg'

export default class BackButton extends Component {

	onClick(){
		window.history.back()
	}
	render(){
		return(
			<div className="playerBackButton" onClick={this.onClick.bind(this)}>
				<Back />
			</div>
		)
	}	
}