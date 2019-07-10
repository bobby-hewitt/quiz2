import React, { Component } from 'react'
import './style.scss'

export default class Button extends Component {
	render(){
		const { text, onClick } = this.props
		return(
			<div className="buttonContainer" onClick={onClick.bind(this)}>
				<p>{text}</p>
			</div>
		)
	}
}