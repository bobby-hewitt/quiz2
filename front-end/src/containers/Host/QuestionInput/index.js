import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText } from 'components'
export default class QuestionInput extends Component {
	render(){
		const { name } = this.props
		return(
			<div className="hostQuestionInputContainer">
				<ColorText text={name} />
				<InputStyleText secondaryText="Enter your search term"/>
			</div>
		)
	}
}