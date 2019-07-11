import React, { Component } from 'react'
import './style.scss'

export default class Loading extends Component {
	render(){
		console.log('rendering loading')
		return(
			<div className="loadingContainer">
				<h4>Loading</h4>
			</div>
		)
	}
}