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
import { PlayerGrid } from 'components'

import { sendQuestionInput } from 'containers/SocketListener/host'
class Host extends Component {

	instructionsComplete(){
		console.log('instructions complete')
		sendQuestionInput(this)
		this.props.push('/host/question-input')
	}

	componentWillMount(){
		if (!this.props.room){
			this.props.push('/host')
		}
	}

	render(){
		const { room , players, question, questionIndex} = this.props
		return(
			<div className="hostContainer">
				<SocketListener isHost/>
				<div className="hostMainContainer">
					<Route exact path="/host" render={() => <PageTitle  title="What would yougle do" room={room}/>} />
					<Route exact path="/host/instructions" render={() => <Instructions complete={this.instructionsComplete.bind(this)} />} />
					<Route exact path="/host/question" render={() => <Question question={question.question} answers={question.answers} isQuestion/>} />
					<Route exact path="/host/answers" render={() => <Question question={question.question} answers={question.answers} isAnswers/>} />
					<Route exact path="/host/question-input" render={() => <QuestionInput name={players && players[questionIndex] ? players[questionIndex].name: ''} />} />
					<Route exact path="/host/end" render={() => <End />} />
				</div>
				<PlayerGrid players={players} title="What would yougle do" room={room}/>	
			</div>
		)
	}
}

const mapStateToProps = state => ({
	room: state.host.room,
	players: state.host.players,
	questionIndex: state.host.questionIndex,
	question:state.host.question,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)