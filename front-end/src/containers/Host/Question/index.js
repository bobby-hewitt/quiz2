import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText} from 'components'
import QuestionHeader from '../QuestionHeader'
import { sendAnswerInput, endCountdown } from 'containers/SocketListener/host'
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
		}
		this.countdownTimeout = setTimeout(() => {
			if (this.state.countdown > 0){
				this.setState({countdown: this.state.countdown - 1})
				this.countdown()
				if (this.state.countdown === 11){
					this.props.timerSound.play()
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
		const { question, answers, isQuestion, isAnswers, players, sounds, loadingState } = this.props
		const maxOffsetScoresIndex = players.length <= 2 ? 1 : players.length <= 4 ? 4 : players.length <= 6 ? 7 : 10
		return(
			<div className="questionContainer">
				{(this.state.countdown || this.state.countdown === 0) &&
					<p className="countdown"><span className="secondary">Time left: </span>{this.state.countdown}</p>
				}
				<div className="questionInfoContainer">
				
				
					<QuestionHeader clearCountdown={this.clearCountdown.bind(this)}text="Fill in the blanks" setGameState={this.props.setGameState.bind(this)} sounds={sounds}/>
	
				</div>
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
					if (!answer.show){
						return (
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'} ${this.state.visible >= i && 'isVisible'} ${i <= maxOffsetScoresIndex && 'offsetRight'}`}>
								{answer && answer.hint && answer.hint.map((letter, j) => {

									if (j === 0 || answer.hint[j-1] === ' '){
										return(
											<p key={`${i}${j}1`}className={`hintLetter ${letter === ' ' && 'space'}`}>
												{answer.answer[j]}
											</p>
										)
									} else {
										return(
											<p key={`${i}${j}2`}className={`hintLetter ${letter === ' ' && 'space'}`}>
												{letter}
											</p>
										)
									}
								})}
								<div className="answerScoreContainer">
									<p className="answerScore">{answer.score}</p>
								</div>
							</div>
						)
					} else {
						return(
							<div key={i} className={`hostHintContainer isVisible ${i % 2 === 0 && 'grey'} ${i <= maxOffsetScoresIndex && 'offsetRight'}`}>
								<p className={`revealedAnswer ${answer.isUndiscovered && 'undiscovered'}`}>{answer.answer}</p>
								<div className="answerScoreContainer">
								{answer.players && answer.players.map((player, j) => {
									
									return(
										<p key={`${i}${j}3`}className="playerInAnswer">{players[player].name}</p>
									)
								})}
								<p className="answerScore">{answer.score}</p>
								</div>
							</div>
						)
					}
				})}
				</div>
				</div>
				</div>
			</div>
		)
	}	
}