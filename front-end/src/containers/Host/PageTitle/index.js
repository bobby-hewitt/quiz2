import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText } from 'components'



export default class PageTitle extends Component {
	constructor(props){
		super(props)
		this.title = this.createTitle()
	}

	createTitle(){
		const { title } = this.props
		var newTitle = []
		for ( var i = 0; i < title.length; i++){
			newTitle.push(title[i])
		}
		return newTitle
	}

	render(){
		const { room, title, loadingState } = this.props
		console.log('loading state', loadingState)
		return(
			<div className={`titleOuterContainer ${loadingState === 'out' && 'out'}`}>
				<ColorText text={title} />
				<InputStyleText primaryText={room? room.short : 'no room'} secondaryText="Room code:" />
				{/*<div className="luckyButtonsContainer">
					<div className="luckyButton">
						<p>I'm feeling great</p>
					</div>
					<div className="luckyButton">
						<p>I'm feeling lucky</p>
					</div>
				</div>*/}
			</div>
		)
	}
}