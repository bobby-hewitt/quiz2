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
		const { users, usersSelected }= this.props
		return(
			<div className="playerContainer">
				<SocketListener />
					<div className="routeContentContainer">
						<Route exact path="/p" render={() => <EnterName push={this.changeScene.bind(this)}/>} />
						<Route exact path="/p/waiting-start" render={() => <WaitingStart push={this.changeScene.bind(this)}/>} />
					</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.player.users,
	usersSelected: state.player.usersSelected
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)