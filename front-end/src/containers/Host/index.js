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
import { PlayerGrid } from 'components'
import { setViewResponses, setGameState, setScreenLoadingState } from 'actions/host'
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

	render(){
		const { room , players, question, questionIndex, isAnswers, setViewResponses, sounds, loadingState, dev} = this.props
		console.log(dev)
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
					<Route exact path="/host/question" render={() => <Question loadingState={loadingState} question={question.question} answers={question.answers} players={players} isAnswers={isAnswers} room={room} setViewResponses={this.props.setViewResponses.bind(this)} timerSound={sounds.timer} sounds={sounds}setGameState={this.props.setGameState.bind(this)}/>} />
					
					<Route exact path="/host/question-input" render={() => <QuestionInput name={players && players[questionIndex] ? players[questionIndex].name: ''} />} />
					<Route exact path="/host/end" render={() => <End />} />
					<Loading loading={loadingState === 'out'} sounds={sounds} dev={dev}/>
				</div>
				<div className="hostPlayersContainer">
				<PlayerGrid players={players} pointsSound={sounds.coin}title="What would yougle do" room={room}/>	<Loading />
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
	loadingState: state.host.screenLoadingState,
	dev: state.dev
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setViewResponses,
  setScreenLoadingState,
  setGameState,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)