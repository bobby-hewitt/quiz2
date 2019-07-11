import React, { Component } from 'react'
import SocketListener from '../SocketListener'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User, Button } from 'components'
import { toggleUserSelect } from 'actions/player'
import { Route } from 'react-router'
import './style.scss'
import EnterName from './EnterName'
import WaitingStart from './WaitingStart'
import Waiting from './Waiting'
import End from './End'
import QuestionInput from './QuestionInput'
import AnswerInput from './AnswerInput'
import Loading from './Loading'

class Player extends Component {

	onClickUser(index){
		this.props.toggleUserSelect(index)
	}

	changeScene(path){
		this.props.push(path)
	}

	componentWillMount(){
		if (window.localStorage.quiz){
			this.props.push('/p')
		}
	}
	render(){
		const { loading, room }= this.props
		return(
			<div className="playerContainer">
				<SocketListener />
				<div className="routeContentContainer">
					<Route exact path="/p" render={() => <EnterName push={this.changeScene.bind(this)}/>} />
					<Route exact path="/p/waiting-start" render={() => <WaitingStart push={this.changeScene.bind(this)}/>} />
					<Route exact path="/p/waiting" render={() => <Waiting />} />
					<Route exact path="/p/question-input" render={() => <QuestionInput />} />
					<Route exact path="/p/answer-input" render={() => <AnswerInput />} />
					<Route exact path="/p/end" render={() => <End room={room}/>} />
				</div>
				{loading && 
					<Waiting />
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading:state.player.loading,
	room:state.player.room
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)