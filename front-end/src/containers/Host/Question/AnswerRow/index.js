import React, { Component } from 'react'
import './style.scss'

export default class AnswerRow extends Component {

	constructor(props){
		super(props)
		this.state = {
			score: this.props.score,
			isAdjusting: false
		}
	}

	componentWillReceiveProps(np){
		if (np.score !== this.state.score && !this.state.isAdjusting){
			
			setTimeout(() => {
				this.adjustScore(parseInt(np.score))
			},750)
			
		}
	}

	adjustScore(target){
		

		this.props.down.play()
		const minus = (value) => {
			setTimeout(() => {
				this.setState({isAdjusting: true, score: this.state.score - value}, () => {

					if (this.state.score >= target + 50){
						minus(50)
					} else if (this.state.score !== target){
						
						minus(this.state.score - target)
					} else {

						this.setState({isAdjusting: false})
					}
				})
			},50)
		}
		if (this.state.score > target){
			minus(50)
		}
		
		
	}


	render(){
		const { answer, show, visible, showPlayerGrid, hint, isUndiscovered, players, isGrey, index, allPlayers, correctPlayers} = this.props
		const { score } = this.state
		
			if (!show){
				return (
					<div className={`hostHintContainer ${isGrey && 'grey'} ${visible >= index && 'isVisible'} ${showPlayerGrid && 'offsetRight'}`}>
						{answer && hint && hint.map((letter, j) => {

							if (j === 0 || hint[j-1] === ' '){
								return(
									<p key={`${j}1`}className={`hintLetter noBorder ${letter === ' ' && 'space'}`}>
										{answer[j]}
									</p>
								)
							} else {
								return(
									<div key={`${j}2`}className={`hintLetter ${letter === ' ' && 'space'}`}>
										
									</div>
								)
							}
						})}
						<div className="answerScoreContainer">
							<p className="answerScore">{score} 💰</p>
						</div>
					</div>
				)
			} else {
				// console.log('revealed answer', allPlayers, player)
				return(
					<div className={`hostHintContainer isVisible ${isGrey && 'grey'} ${showPlayerGrid && 'offsetRight'}`}>
						<p className={`revealedAnswer ${isUndiscovered && 'undiscovered'}`}>{answer}</p>
						<div className="answerScoreContainer">
						{correctPlayers && correctPlayers.map((player, j) => {
							const p = allPlayers[player]
							return(
								<p key={`${j}3`}className="playerInAnswer" style={{color: p.color}}>{p.name}</p>
							)
						})}
						<p className="answerScore">{score}<span className="spacing"> 💰</span></p>
						</div>
					</div>
				)
			}
		
	}
}