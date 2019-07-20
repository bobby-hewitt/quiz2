import React, {Component } from 'react'
import './style.scss'

const colors = [
	'blue', 'red', 'yellow', 'blue' ,'green', 'red'
]

export default class ColorText extends Component {
	constructor(props){
		super(props)
		this.text = this.createTitle()
		this.timeoutTime = 100
		this.timeout = false
		this.state = {
			visible: -1
		}
	}

	componentDidMount(){
		this.displayTitle(0)
	}

	displayTitle(i){
		this.timeout = setTimeout(() => {
			if (this.state.visible < this.text.length-1){
				this.setState({visible: i}, () => {
					this.displayTitle(i + 1)
				})		
			} else if (this.props.loadComplete){
				
				this.props.loadComplete()
			}
		}, this.timeoutTime)
	}

	componentWillUnmount(){
		clearTimeout(this.timeout)
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
		const { visible } = this.state
		return(
			<div className="colorTextContainer" style={containerStyle ? containerStyle : {}}>
				{this.text.map((letter, i) => {
					var cn = `letterTitle ${colors[i%colors.length]} ${letter === ' ' && 'space'} `
					if (visible >= i) cn += 'visible'
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