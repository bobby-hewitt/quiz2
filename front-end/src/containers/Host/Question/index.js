import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText} from 'components'
import QuestionHeader from '../QuestionHeader'
import { showAnswerInput } from 'containers/SocketListener/host'
export default class Question extends Component {

	constructor(props){
		super(props)
		this.timeout = false
		this.state = {
			visible: -1
		}
	}

	componentDidMount(){
		// this.showAnswer(0)

	}

	componentWillReceiveProps(np){
		if (!this.props.answers.length && np.answers.length){
			setTimeout(() => {
				this.showAnswer(0)
			},100)

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
				} else {
					showAnswerInput(this.props.room)
				}
			})

		},300)
	}

	componentWillUnmount(){
		clearTimeout(this.timeout)
	}





	render(){
		const { question, answers, isQuestion, isAnswers, players } = this.props
		return(
			<div className="questionContainer">
				<div className="questionInfoContainer">
				
				
					<QuestionHeader text="Fill in the blanks"/>
				
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

									if (j === 0){
										return(
											<p key={`${i}${j}`}className={`hintLetter ${letter === ' ' && 'space'}`}>
												{answer.answer[0]}
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
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'}`}>
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