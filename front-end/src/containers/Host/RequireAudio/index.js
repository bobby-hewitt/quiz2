import React, { Component } from 'react'
import { Button, ColorText } from 'components'
import './style.scss'

export default class RequireAudio extends Component {
	constructor(props){
		super(props)
		this.state = {
			isVisible: true
		}
	}
	onClick(){
		this.setState({isVisible: false}, () => {
			setTimeout(() => {
				this.props.onRequireAudio()
			},300)
		})
		
	}
	render(){
		const { isVisible } = this.state
		return(
			<div className={`requireAudioContainer ${isVisible && 'isVisible'}`}>
				<div className="requireAudioInner">
				<ColorText text="Hey there" />
				<p className="explainer">

					Some silly browsers need people to click before they'll play sounds<br/>
					And some silly games need sounds to work
				</p>
				<Button text="continue" onClick={this.onClick.bind(this)}/>
				</div>

			</div>
		)
	}
}