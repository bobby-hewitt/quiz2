import React, { Component } from 'react'
import './style.scss'
import { ColorText } from 'components'
export default class Instructions extends Component {

	constructor(props){
		super(props)
		this.timeouts = []
		this.audio = new Audio(require('assets/narration/intro.wav'))
		this.tips = this.props.dev ? [] : [
			{
				text: 'The auto complete search engine game',
				time: 1500,
			},
			{
				text: 'One player enters the beginning of a search term',
				time: 3000,
			},
			{
				text: 'Everyone guesses what the auto complete suggestions might be',
				time: 3000,
			},
			{
				text: 'Pro tip: Be specific with your search terms!',
				time: 2000,
			},
			{
				text: "Let's go!",
				time: 1000,
			}
		]
		this.state = {
			tip: -1,
			animated: 'out'
		}

	}
	componentDidMount(){
		// const audio = new Audio(require('assets/narration/intro.wav'))
		if (this.props.dev){
			this.next()
		} else {
			this.audio.onended = () => {
				this.next()
			}
			this.audio.play()

			this.props.setScreenLoadingState('in')
		}
		// this.timeouts[0] = setTimeout(() => {
		// 	this.props.complete()
		// },10000)
		// this.showTip(0)
	}

	next(){
		this.props.setScreenLoadingState('out')
			this.props.sounds.start.play() 
			setTimeout(() => {
				this.props.complete()
			}, this.props.dev ? 0 : 3500)
	}

	// showTip(index){
	// 	if (this.tips[index]){
	// 		this.setState({tip: index}, () => {
	// 			setTimeout(() => {
	// 				this.setState({animated: 'in'}, ()=> {
	// 					setTimeout(() => {
	// 						this.setState({animated: 'out'}, () => {
	// 							setTimeout(() => {
	// 								this.showTip(index + 1)
	// 							},600)
	// 						})
	// 					}, this.tips[index].time)
	// 				})
	// 			}, 100)
	// 		})
	// 	} else {
	// 		// this.props.setScreenLoadingState('out')
	// 		// this.props.sounds.interstitial4.play() 
	// 		// setTimeout(() => {
	// 		// 	this.props.complete()
	// 		// }, this.props.dev ? 0 : 1500)
			
	// 	}
	// }

	titleComplete(){
		// this.showTip(0)
	}


	componentWillUnmount(){
		this.audio.pause()
		for (var i = this.timeouts.length - 1; i >= 0; i--) {
			clearTimeout(this.timeouts[i])
		}
	}
	render(){
		const tip = this.tips[this.state.tip] ? this.tips[this.state.tip].text : ''
		const { animated }= this.state
		return(
			<div className="instructionContainer">
				
				<div className="videoContainer">
				<video autoPlay loop height={window.innerHeight-110}>
				  <source src={require('assets/videos/instruction.mov')} type="video/mp4" />
				  
				  Your browser does not support the video tag.
				</video>
				</div>
				<div className="instructions">
				<ColorText text="How to play" loadComplete={this.titleComplete.bind(this)}/>
				<p className={`instruction ${animated}`}>{tip}</p>
				</div>
			</div>
		)
	}
}