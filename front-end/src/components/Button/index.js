import React, { Component } from 'react'
import './style.scss'

export default class Button extends Component {
	render(){
		const { text, onClick, containerStyle, textStyle, danger } = this.props
		return(
			<div className={`buttonContainer ${danger && 'danger'}`} onClick={onClick.bind(this)} style={containerStyle ? containerStyle : {}}>
				<p style={textStyle ? textStyle : {}}>{text}</p>
			</div>
		)
	}
}