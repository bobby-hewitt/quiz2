import React, { Component } from 'react'
import './style.scss'

export default class BottomContainer extends Component {
	render(){
		return(
			<div className="bottomContainer">
				{this.props.children}
			</div>
		)
	}
}