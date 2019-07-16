import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText } from 'components'



export default class PageTitle extends Component {
	constructor(props){
		super(props)
		this.state = {
			titleLoaded: false
		}
	}


	titleLoadComplete(){
		this.setState({titleLoaded: true})
	}

	render(){
		const { room, title, loadingState } = this.props
		const { titleLoaded } = this.state
		 
		return(
			<div className={`titleOuterContainer ${loadingState === 'out' && 'out'}`}>
				<ColorText text={title} loadComplete={this.titleLoadComplete.bind(this)}/>
				<InputStyleText primaryText={room? room.short : 'no room'} secondaryText="Room code:" isVisible={titleLoaded}/>
				
			</div>
		)
	}
}