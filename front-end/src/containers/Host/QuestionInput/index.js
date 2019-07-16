import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText } from 'components'
export default class QuestionInput extends Component {

	constructor(props){
		super(props)
		this.state = {
			isLoaded: false
		}
	}

	loadComplete(){
		this.setState({isLoaded: true})
	}

	render(){


		const { name } = this.props
		return(
			<div className="hostQuestionInputContainer">
				<ColorText text={name} loadComplete={this.loadComplete.bind(this)}/>
				<InputStyleText isVisible={this.state.isLoaded}secondaryText="Enter your search term"/>
			</div>
		)
	}
}