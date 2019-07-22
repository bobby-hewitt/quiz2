import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText } from 'components'
export default class QuestionInput extends Component {

	constructor(props){
		super(props)
		this.timeout = false
		this.state = {
			isLoaded: false,
			index: 0
		}
	}

	loadComplete(){
		this.setState({isLoaded: true})
	}

	
	componentDidMount(){
		this.getNewPlayer()
	}

	getNewPlayer(){
		this.setState({index: this.state.index+ 1})
		if (this.props.isChoosing){
			this.timeout = setTimeout(() => {
				this.getNewPlayer()
			},150)
		}

	}

	componentWillUnmount(){
		clearTimeout(this.timeout)
	}


	render(){


		const { name, players, isChoosing } = this.props
		const { index } = this.state
		
		const player = players[index % players.length]
		return(
			<div className="hostQuestionInputContainer">
				{player && isChoosing  &&
					<ColorText text={player.name} />	
				}
				{!isChoosing &&
					<ColorText text={name} loadComplete={this.loadComplete.bind(this)}/>
				}
				
				<InputStyleText isVisible={this.state.isLoaded  && !isChoosing}secondaryText={"Enter your search term"}/>
				
			</div>
			
		)
	}
}