import React, {Component } from 'react'
import './style.scss'

const colors = [
	'blue', 'red', 'yellow', 'blue' ,'green', 'red'
]

export default class ColorText extends Component {
	constructor(props){
		super(props)
		this.text = this.createTitle()
	}

	createTitle(){
		const { text } = this.props
		var newText = []
		for ( var i = 0; i < text.length; i++){
			newText.push(text[i])
		}
		return newText
	}
	render(){
		const { letterStyle, containerStyle } = this.props
		return(
			<div className="colorTextContainer" style={containerStyle ? containerStyle : {}}>
				{this.text.map((letter, i) => {
					var cn = `letterTitle ${colors[i%colors.length]} ${letter === ' ' && 'space'} `
					return(
						<h4 className={cn} key={i} style={letterStyle ? letterStyle : {}}>
							{letter}
						</h4>
					)
				})}
			</div>
		)
	}
}