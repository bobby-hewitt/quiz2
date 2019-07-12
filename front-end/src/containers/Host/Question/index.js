import React, { Component } from 'react'
import './style.scss'
import { ColorText, InputStyleText} from 'components'
import QuestionHeader from '../QuestionHeader'
export default class Question extends Component {
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
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'}`}>
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
								{answer.players && answer.players.map((player, i) => {
									console.log('player in answer')
									return(
										<p className="playerInAnswer">{players[player].name}</p>
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