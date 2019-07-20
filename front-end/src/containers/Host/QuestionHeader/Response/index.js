import React, { Component } from 'react'
import './style.scss'
import { Player, InputStyleText } from 'components'

export default class Response extends Component {

	constructor(props){
		super(props)
		this.timeouts =[]
		this.state = {
			isAnimatedIn: false
		}
	}

	componentDidMount(){
		const { timeout } = this.props
		this.timeouts[0] = setTimeout(() => {
			this.setState({isAnimatedIn: true}, () => {
				this.timeouts[1] = setTimeout(() => {
					this.setState({isAnimatedIn: false})
				}, timeout)
			})
		})
	}

	componentWillReceiveProps(np){
		if (np.showRightWrong && !this.props.showRightWrong){
			setTimeout(() => {
				if (np.showRightWrong === 'right'){
					var audio = new Audio(require('assets/sounds/correct.mp3'));
					audio.play()
				} else {
					var audio = new Audio(require('assets/sounds/wrong.wav'));
					audio.play()
				}
			},100)
		}
	}

	componentWillUnmount(){
		for(var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}
	render(){
		const { color, player, showRightWrong, bonus } = this.props
		return(
			<div className={`answersHeaderInner ${this.state.isAnimatedIn && 'isAnimated'} ${showRightWrong === 'right' && 'correct'} ${showRightWrong  && showRightWrong !== 'right' && 'incorrect'}`}>
				{/*<h4 className="answerPlayerName">{player.name}'s answer</h4>*/}
				<Player {...player} large/>
				{!(bonus || bonus === 0) &&
				<InputStyleText isVisible primaryText={player.answer || '❌'} correct={showRightWrong && showRightWrong === 'right'} incorrect={showRightWrong && showRightWrong !== 'right'}containerStlye={{margin:'0px', marginTop:'-30px', height:'60px'}}/>
				}
					{/*<h4 className={`emoji ${showRightWrong && ' isVisible'}`}>{showRightWrong === 'right' ? '✅' : '❌'}</h4>*/}
				
				{(bonus || bonus === 0) &&
					<h4 className="answer">{`500 bonus * ${bonus}`}</h4>	
				}
			</div>
		)
	}
}