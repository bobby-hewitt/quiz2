import React, { Component } from 'react'
import './style.scss'
import { ColorText } from 'components'
export default class QuestionInput extends Component {
	render(){
		const { name } = this.props
		return(
			<div className="hostQuestionInputContainer">
				<ColorText text={name} />
				<h4 className="instructions">Enter your search term</h4>
			</div>
		)
	}
}