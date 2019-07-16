import React, { Component } from 'react'
import './style.scss'

export default class InputStyleText extends Component {


	constructor(props){
		super(props)
		
	}

	render(){
		const { secondaryText, primaryText, containerStyle, isVisible } = this.props


		return(
			<div className={`inputStyleTextContainer ${isVisible && 'inputContainerExpanded'}`} >
				<p className="inputText"><span className="secondary">{secondaryText} </span>{primaryText}</p>
				<img src="http://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png" />
			</div>
		)
	}
}