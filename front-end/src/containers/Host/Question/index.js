import React, { Component } from 'react'
import './style.scss'
import { ColorText} from 'components'
import QuestionHeader from '../QuestionHeader'
export default class Question extends Component {
	render(){
		const { question, answers, isQuestion, isAnswers } = this.props
		return(
			<div className="questionContainer">
				{isQuestion &&
					<ColorText text="Fill in the blanks" containerStyle={{height:'120px'}}/>
				}
				{isAnswers &&
					<QuestionHeader text="Fill in the blanks" />
				}
				<div className="questionShadowContainer">
				<div className="questionInnerContainer">
					<p className="question">{question}...</p>
					<div className="underline" />
				</div>
				<div className="hostHintsContainer">
				{answers && answers.map((answer, i) => {
					if (!answer.show){
						return (
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'}`}>
								{answer && answer.hint && answer.hint.map((letter, j) => {
									return(
										<p key={`${i}${j}`}className={`hintLetter ${letter === ' ' && 'space'}`}>
											{letter}
										</p>
									)
								})}


							</div>
						)
					} else {
						return(
							<div key={i} className={`hostHintContainer ${i % 2 === 0 && 'grey'}`}>
								<p className="revealedAnswer">{answer.answer}</p>
							</div>
						)
					}
				})}
				</div>
				</div>
			</div>
		)
	}	
}