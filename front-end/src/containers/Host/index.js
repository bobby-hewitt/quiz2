import React, { Component } from 'react'
import './style.scss'
import SocketListener from '../SocketListener'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Instructions from './Instructions'
import Question from './Question'
import PageTitle from './PageTitle'
import QuestionInput from './QuestionInput'
import End from './End'
import Loading from './Loading'
import ScoreBoard from './ScoreBoard'
import { PlayerGrid } from 'components'
import { setViewResponses, setGameState, setScreenLoadingState, nextQuestion } from 'actions/host'
import { sendQuestionInput } from 'containers/SocketListener/host'
class Host extends Component {

	instructionsComplete(){

		sendQuestionInput(this)
	}

	componentWillMount(){
		if (!this.props.room){
			this.props.push('/host')
		}
	}

	showPlayerGrid(){
		const { players } = this.props 
		var showPlayers = false
		if (window.location.pathname === '/host'){
			showPlayers = true
		}
		for (var i = players.length - 1; i >= 0; i--) {
			if (!players[i].isConnected){
				showPlayers = true
			}
		}
		return showPlayers
	}


	render(){
		const { room , players, question, gameState, questionIndex, isAnswers, setViewResponses, sounds, loadingState, dev, round} = this.props
		const showPlayerGrid = this.showPlayerGrid()
		return(
			<div className="hostContainer">
				<SocketListener isHost/>
				
				<div className="hostBackground" style={{backgroundImage: 'url(' + require('assets/images/png/hostBackground.png')+ ')'}}>
					<div className="hostBackgroundOverlay">
					</div>
				</div>
				<div className="hostMainContainer">
					<Route exact path="/host" render={() => <PageTitle  title="Trending.guru" room={room} backgroundSound={sounds.typing} loadingState={loadingState}/>} />
					<Route exact path="/host/instructions" render={() => <Instructions dev={dev} sounds={sounds}complete={this.instructionsComplete.bind(this)} setScreenLoadingState={this.props.setScreenLoadingState.bind(this)}/>} />
					<Route exact path="/host/question" render={() => <Question showPlayerGrid={showPlayerGrid} round={round}loadingState={loadingState} question={question.question} answers={question.answers} players={players} isAnswers={isAnswers} room={room} setViewResponses={this.props.setViewResponses.bind(this)} timerSound={sounds.timer} sounds={sounds}setGameState={this.props.setGameState.bind(this)}/>} />
					
					<Route exact path="/host/question-input" render={() => <QuestionInput isChoosing={gameState !== 'question-entry'} players={players} name={players && players[questionIndex] ? players[questionIndex].name: ''} />} />
					<Route exact path="/host/end" render={() => <End />} />
					<Route exact path="/host/scores" render={() => <ScoreBoard />} />
					<Loading loading={loadingState === 'out'} sounds={sounds} dev={dev}/>
				</div>
				<div className="hostPlayersContainer">
				<PlayerGrid isVisible={showPlayerGrid}players={players} pointsSound={sounds.coin}title="What would yougle do" room={room}/>	
				<Loading />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	room: state.host.room,
	hostRoom: state.host.room,
	isAnswers: state.host.viewResponses,
	players: state.host.players,
	questionIndex: state.host.questionIndex,
	question:state.host.question,
	sounds: state.sounds,
	round: state.host.round,
	gameState: state.host.gameState,
	loadingState: state.host.screenLoadingState,
	dev: state.dev
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setViewResponses,
  nextQuestion,
  setScreenLoadingState,
  setGameState,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)