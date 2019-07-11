import React, { Component } from 'react'
import './style.scss'
import { ColorText } from 'components'
export default class Waiting extends Component {
	render(){
		return(
			<div className="waitingContainer">
			<ColorText text="waiting" letterStyle={{fontSize:'50px'}}/>
			</div>
		)
	}
}