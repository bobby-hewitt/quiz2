import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText} from 'components'
import QuestionHeader from '../QuestionHeader'
import { sendAnswerInput, endCountdown } from 'containers/SocketListener/host'
import AnswerRow from './AnswerRow'
export default class Question extends Component {

	constructor(props){
		super(props)
		this.timeout = false
		this.countdownTimeout = false
		this.state = {
			visible: -1,
			countdown: false,
			
		}
	}

	componentDidMount(){
		if (this.props.answers.length){
			setTimeout(() => {
				this.showSearchTerm(0)
			},100)
		}
	}

	countdown(isStart){
		if (isStart) {
			this.setState({countdown: 60})
			this.props.sounds.bell.play()
			this.props.timerSound.playbackRate = 1;
			this.props.timerSound.play();
		}
		this.countdownTimeout = setTimeout(() => {
			if (this.state.countdown > 0){
				this.setState({countdown: this.state.countdown - 1})
				this.countdown()
				if (this.state.countdown === 30){
					const audio = new Audio(require('assets/narration/timer/30.wav'))
					audio.play()
				} else if (this.state.countdown === 10){
					this.props.timerSound.playbackRate = 2;
					const audio = new Audio(require('assets/narration/timer/10.wav'))
					audio.play()
				}
			} else {
				this.props.timerSound.pause();
				this.props.sounds.alarm.play()
    			this.props.timerSound.currentTime = 0;
				//end countdown
				endCountdown(this, this.props.room)
			}
		},1000)
	}

	clearCountdown(){
		clearTimeout(this.countdownTimeout)
		this.setState({countdown: false})
	}

	showSearchTerm(){
		this.props.sounds.interstitial1.play()
		this.setState({showSearchTerm: true})
		setTimeout(() => {
			this.showAnswer(0)
		},300)
	}

	componentWillReceiveProps(np){
		if (!this.props.answers.length && np.answers.length){
			setTimeout(() => {
				this.showSearchTerm(0)
			},100)
		}
		if (this.props.isAnswers !== np.isAnswers){
			if (np.isAnswers){
				clearTimeout(this.countdownTimeout)
				this.setState({countdown: false})
			} else {
				this.countdown(true)
			}
		}
	}

	showAnswer(index){
		const { answers } = this.props
		this.timeout = setTimeout(() => {
			this.setState({visible: index}, () => {
				
				if (answers && index < answers.length -1){
					this.showAnswer(index +1)
					// setTimeout(() => {
					// 	// this.props.sounds.bounce.play()
					// },50)
					
				} else {
					setTimeout(() =>{
						this.countdown(true)
						sendAnswerInput(this, this.props.room)
					},2000)
					
				}
			})

		},100)
	}

	componentWillUnmount(){
		clearTimeout(this.countdownTimeout)
		clearTimeout(this.timeout)
	}





	render(){
		const { round, question, answers, sounds, isQuestion, isAnswers, players, loadingState, showPlayerGrid } = this.props
		const { countdown, visible }= this.state
		return(
			<div className="questionContainer">
				{(countdown || countdown === 0) &&
					<p className={`countdown ${countdown > 50 ? 'green' : 'red'}`}><span className="a">Time left: </span>{this.state.countdown}</p>
				}
				

				
				
					<QuestionHeader sounds={sounds} clearCountdown={this.clearCountdown.bind(this)}text="Fill in the blanks" setGameState={this.props.setGameState.bind(this)} sounds={sounds}/>
	
			
				<div className="questionAndAnswerContainer">
				
				<div className={`questionShadowContainer ${loadingState === 'in' && 'isVisible'}`}>
				<div className="questionInnerContainer">
					<div className="questionController">
					<InputStyleText isVisible={this.state.showSearchTerm}primaryText={`${question}...`} containerStyle={{margin:'0px'}}/>
					</div>
					<div className="responseContainer">
					{players && !isAnswers && players.map((player, i ) => {
						if (player.answer){
							return(
								<p key={i} className="responseIndicator">{player.name}</p>

							)
						} else {
							return<div key={i}/>
						}
					})}
					</div>
					<div className="underline" />
				</div>
				<div className="hostHintsContainer">
				{answers && answers.map((answer, i) => {
					const score = answer.correctPlayers.length ? Math.floor(answer.score / answer.correctPlayers.length) : answer.score
					return(
						<AnswerRow down={sounds.down} key={i} {...answer} allPlayers={players} isGrey={i % 2 === 0 } showPlayerGrid={showPlayerGrid} visible={visible} index={i} score={score}/>
					)
				})}
				</div>
				</div>
				</div>
			</div>
		)
	}	
}