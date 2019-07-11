import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { Button, TextInput, BottomContainer, ColorText, Player } from 'components'
import { updateAnswers, updatePlayers, nextRound } from 'actions/host'
import { sendAnswerInput } from 'containers/SocketListener/host'
const colors = [
	'#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58','#DB4437'
]

class QuestionHeader extends Component {

	constructor(props){
		super(props)
		this.playerDuration = 4000;
		this.timeouts = []
		this.state = {
			showAnswer: false,
			playerIndex: 0,
			player: null,
		}
	}


	componentDidMount(){
		const { players } = this.props
		console.log(this.props.players)
		for (var i = 0; i < players.length; i++){
			this.showPlayer(i)
		}
	}

	showPlayer(i){
		const { players } = this.props
		this.timeouts[i] = setTimeout(() => {
			this.setState({player: players[i], playerIndex: i}, () => {
				this.timeouts[i] = setTimeout(() => {
					this.setState({showAnswer: true}, () => {
						this.timeouts[i] = setTimeout(() => {
							// update scoreboard
							this.updateAnswers(players[i].answer, i)
							this.timeouts[i] = setTimeout(() => {
								this.setState({
									player: false, 
									showAnswer:false
								})
							}, this.playerDuration /8 * 7)
						})
						
					})
				}, this.playerDuration / 4)
			})
		}, this.playerDuration * i)
	}

	updateScore(i , score){
		const { players } = this.props 
		var newPlayers = Object.assign([], players)
		newPlayers[i].score += score
		this.props.updatePlayers(newPlayers)
	}

	updateAnswers(playerAnswer, index){
		const { answers } = this.props
		var newAnswers = Object.assign([], this.props.answers)
		for (var i = 0; i < newAnswers.length; i++){
			if (newAnswers[i].answer === playerAnswer){
				newAnswers[i].show = true
				this.updateScore(index, newAnswers[i].relevance + 500)
			}
		}
		this.props.updateAnswers(answers)
	}

	nextRound(){
		const { round } = this.props
		const moreAnswersAvaliable = this.moreAnswersAvaliable()
		if (!moreAnswersAvaliable || round === 3){
			//next question input
			console.log('NEXT QUESTION')
			//perform reset
		} else {
			//next round
			this.props.nextRound()
			sendAnswerInput(this, this.props.room)
		}
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
		const { player, playerIndex, showAnswer} = this.state
		console.log(player)
		return(
			<div className="answersHeaderContainer">
				{player && 
					<div className="answersHeaderInner">
					<Player color={colors[playerIndex]}{...player} />
					<h4 className="answerTitle">Answer: </h4>
					{showAnswer &&
						

						<h4 className="answer">{player.answer}</h4>
						
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
	room: state.host.room
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAnswers,
  updatePlayers,
  nextRound
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionHeader)