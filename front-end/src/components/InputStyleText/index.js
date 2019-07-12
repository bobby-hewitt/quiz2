import React, { Component } from 'react'
import './style.scss'

export default class InputStyleText extends Component {
	render(){
		const { secondaryText, primaryText, containerStyle } = this.props
		return(
			<div className="inputStyleTextContainer" style={containerStyle ? containerStyle : {}}>
				<h4 className="text"><span className="secondary">{secondaryText} </span>{primaryText}</h4>
				<img src="http://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png" />
			</div>
		)
	}
}