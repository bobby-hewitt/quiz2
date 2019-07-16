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
		// this.showAnswer(0)
	}

	countdown(isStart){
		if (isStart) this.setState({countdown: 60})
		this.countdownTimeout = setTimeout(() => {
			if (this.state.countdown > 0){
				this.setState({countdown: this.state.countdown - 1})
				this.countdown()
				if (this.state.countdown === 11){
					this.props.timerSound.play()
				}
			} else {
				this.props.timerSound.pause();
    			this.props.timerSound.currentTime = 0;
				//end countdown
				endCountdown(this, this.props.room)
			}
		},1000)
	}

	componentWillReceiveProps(np){
		if (!this.props.answers.length && np.answers.length){
			setTimeout(() => {
				this.showAnswer(0)
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
		console.log(answers)
		this.timeout = setTimeout(() => {
			this.setState({visible: index}, () => {
				console.log('showing answers', index, answers.length)
				if (answers && index < answers.length -1){
					this.showAnswer(index +1)
					setTimeout(() => {
						this.props.sounds.bounce.play()
					},400)
					
				} else {
					setTimeout(() =>{
						this.countdown(true)
						sendAnswerInput(this, this.props.room)
					},2000)
					
				}
			})

		},300)
	}

	componentWillUnmount(){
		clearTimeout(this.countdownTimeout)
		clearTimeout(this.timeout)
	}





	render(){
		const { question, answers, isQuestion, isAnswers, players, sounds } = this.props
		return(
			<div className="questionContainer">
				{(this.state.countdown || this.state.countdown === 0) &&
					<p className="countdown"><span className="secondary">Time left: </span>{this.state.countdown}</p>
				}
				<div className="questionInfoContainer">
				
				
					<QuestionHeader text="Fill in the blanks" setGameState={this.props.setGameState.bind(this)} sounds={sounds}/>
				
				</div>
				<div className="questionAndAnswerContainer">
				
				<div className="questionShadowContainer">
				<div className="questionInnerContainer">
					<InputStyleText primaryText={`${question}...`} containerStyle={{margin:'0px'}}/>
					<div className="responseContainer">
					{players && !isAnswers && players.map((player, i ) => {
						if (player.answer){
							return(
								<p className="responseIndicator">{player.name}</p>

							)
						} else {
							return<div/>
						}
					})}
					</div>
					<div className="underline" />
				</div>
				<div className="hostHintsContainer">
				{answers && answers.map((answer, i) => {
					if (!answer.show){
						return (
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'} ${this.state.visible >= i && 'isVisible'}`}>
								{answer && answer.hint && answer.hint.map((letter, j) => {

									if (j === 0 || answer.hint[j-1] === ' '){
										return(
											<p key={`${i}${j}`}className={`hintLetter ${letter === ' ' && 'space'}`}>
												{answer.answer[j]}
											</p>
										)
									}
									return(
										<p key={`${i}${j}`}className={`hintLetter ${letter === ' ' && 'space'}`}>
											{letter}
										</p>
									)
								})}
								<div className="answerScoreContainer">
									<p className="answerScore">{answer.score}</p>
								</div>
							</div>
						)
					} else {
						
						return(
							<div key={i} className={`hostHintContainer isVisible ${i % 2 === 0 && 'grey'}`}>
								<p className={`revealedAnswer ${answer.isUndiscovered && 'undiscovered'}`}>{answer.answer}</p>
								<div className="answerScoreContainer">
								{answer.players && answer.players.map((player, j) => {
									console.log('player in answer')
									return(
										<p key={`${i}${j}`}className="playerInAnswer">{players[player].name}</p>
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