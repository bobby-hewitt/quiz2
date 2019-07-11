import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { Button, TextInput, BottomContainer, ColorText, Player } from 'components'
import { updateAnswers, updatePlayers, setRound, nextQuestion,setFinalPlayers } from 'actions/host'
import { sendAnswerInput, sendQuestionInput, endGame } from 'containers/SocketListener/host'
const colors = [
	'#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58','#DB4437'
]

class QuestionHeader extends Component {

	constructor(props){
		super(props)
		this.playerDuration = 6000;
		this.answerDuration = 600;
		this.timeouts = []
		this.state = {
			showAnswer: false,
			playerIndex: 0,
			player: null,
		}
	}


	componentDidMount(){
		const { players } = this.props
		var newPlayers = Object.assign([], players)
		for (var i = 0; i < players.length; i++){
			newPlayers[i].hasSubmitted = false
		}
		this.props.updatePlayers(newPlayers)
		this.showPlayer(0)

	}

	showPlayer(i){
		const { players } = this.props
		// this.timeouts[i] = setTimeout(() => {

			this.setState({player: players[i], playerIndex: i}, () => {
				this.timeouts[i] = setTimeout(() => {
					this.setState({showAnswer: true}, () => {
						this.timeouts[i] = setTimeout(() => {
							// update scoreboard
							this.updateAnswers(players[i].answer, i)
							this.timeouts[i] = setTimeout(() => {
								this.setState({
									showRightWrong: false,
									player: false, 
									showAnswer:false
								}, () => {
									if (i === players.length-1) {
										this.nextRound()
									} else {
										this.showPlayer(i+1)
									}
								})

							}, this.playerDuration /4)
						},  this.playerDuration / 4)
						
					})
				}, this.playerDuration / 4)
			})


		// }, (this.playerDuration * (i + 1)) - this.playerDuration)
	}

	updateScore(i , score){
		const { players } = this.props 
		var newPlayers = Object.assign([], players)
		newPlayers[i].score += score
		this.props.updatePlayers(newPlayers)
	}

	updateAnswers(playerAnswer, index){
		const { answers, round } = this.props
		var newAnswers = Object.assign([], this.props.answers)
		var isCorrect = false
		for (var i = 0; i < newAnswers.length; i++){
			if (newAnswers[i].answer === playerAnswer && (!newAnswers[i].show || newAnswers[i].show === round)){
				newAnswers[i].show = round
				this.updateScore(index, newAnswers[i].relevance + 500)
				isCorrect = true
			}
		}
		this.setState({showRightWrong: isCorrect ? 'right' : 'false'})
		this.props.updateAnswers(answers)
	}

	nextRound(){
		const { round, questionIndex, players } = this.props
		const moreAnswersAvaliable = this.moreAnswersAvaliable()
		if (!moreAnswersAvaliable || round === 3){
			//next question input
			
			this.revealAnswers()
			
			//perform reset
		} else {
			//next round
			this.props.setRound(round + 1)
			sendAnswerInput(this, this.props.room)
			this.props.push('/host/question')
		}
	}

	revealAnswers(){
		const { round, questionIndex, players, answers } = this.props
		var notAnsweredCount = 0;
		var answeredCount = 0
		for (var i = 0; i < answers.length; i++){
			if (!answers[i].show){
				notAnsweredCount += 1
				this.revealAnswer(i, notAnsweredCount)
			} else {
				answeredCount += 1;
			}
		}
		this.moveForwards(notAnsweredCount, answeredCount)
		
		
	}

	moveForwards(notAnsweredCount, answeredCount){
			const { round, questionIndex, players, answers } = this.props
			var newPlayers = Object.assign([], players)
			setTimeout(() => {
				this.setState({player: players[questionIndex], bonus: answeredCount}, () => {
					newPlayers[questionIndex].score += 500 * answeredCount
					this.props.updatePlayers(newPlayers)
					setTimeout(() => {
						//add bonus points
						this.setState({player: false, bonus: false}) 
						if (questionIndex === players.length-1){
							console.log('END GAME')
							this.setEndGame()
						} else {
							//next question
							this.props.nextQuestion()
							this.props.setRound(1)
							var newPlayers = Object.assign([], players)
							for (var i = 0; i < players.length; i++){
								players[i].answer = false
								players[i].hasSubmitted = false
							}
							this.props.updatePlayers(newPlayers)
							sendQuestionInput(this)
						}
					},2500)
					
				})
			}, (notAnsweredCount + 2) * this.answerDuration)
	}

	setEndGame(){
		const { players } = this.props
		var newPlayers = Object.assign([], players)
		let finalPlayers = []
		for (var i = 0; i < players.length; i++){
			if (players[i].name.length) finalPlayers.push(players[i])
		} 
		finalPlayers.sort(function(a, b){return a.score-b.score});
		this.props.setFinalPlayers(finalPlayers)
		for (var i = 0; i < newPlayers.length; i++){
			players[i].score = 0
			players[i].answer = false
			players[i].hasSubmitted = false
		}
		this.props.updatePlayers(newPlayers)
		this.props.setRound(1)
		this.props.nextQuestion(0)
		endGame(this)
	}

	revealAnswer(i, timeout){
		setTimeout(() => {
			const { answers } = this.props
			var newAnswers = Object.assign([],answers)
			newAnswers[i].show = true
			newAnswers[i].isUndiscovered = true
			this.props.updateAnswers(newAnswers)
		}, this.answerDuration * timeout)
	}


	moreAnswersAvaliable(){
		const { answers } = this.props
		var found = 0
		for (var i = answers.length - 1; i >= 0; i--) {
			if (answers[i].show) found += 1
		}
		if (found === answers.length){
			return false
		} else {
			return true
		}
	}

	componentWillUnmount(){
		for (var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}

	render(){
		const { player, playerIndex, showAnswer, showRightWrong, bonus} = this.state
		console.log(player)
		return(
			<div className="answersHeaderContainer">
				{player && 
					<div className="answersHeaderInner">
					<Player color={colors[playerIndex]}{...player} />
					
					{showAnswer &&
						<h4 className="answer"><span className='answerTitle'>Answer:</span>{player.answer}</h4>
					}
					{showRightWrong && 
						<h4 className="emoji">{showRightWrong === 'right' ? '✅' : '❌'}</h4>
					}
					{(bonus || bonus === 0) &&
						<h4 className="answer">{`500 bonus * ${bonus}`}</h4>	
					}
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	players: state.host.players,
	answers: state.host.question.answers,
	round: state.host.round,
	room: state.host.room,
	questionIndex: state.host.questionIndex,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	push: (path) => push(path),
  updateAnswers,
  nextQuestion,
  setFinalPlayers,
  updatePlayers,

  setRound
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionHeader)