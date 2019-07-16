import React, { Component } from 'react'
import './style.scss'

export default class Points extends Component {
	render(){
		return(
			<div className="pointsContainer">
				<p className="coin1 coin">💰</p>
				<p className="coin2 coin">💰</p>
				\<p className="coin3 coin">💰</p>
			</div>
		)
	}
}