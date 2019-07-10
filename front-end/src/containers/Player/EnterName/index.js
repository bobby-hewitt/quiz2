import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { BackButton, Button, TextInput, BottomContainer } from 'components'
import { sendName } from 'containers/SocketListener/player'


class NameTeam extends Component {

	constructor(props){
		super(props)
		this.state = {
			value: ''
		}
	}

	onContinue(name){
		sendName(
			{

				room: this.props.room ,
				name: name
			}
		)
		this.props.push('/p/waiting-start')
	}

	onChange(value){
		this.setState({value})
	}

	componentDidMount(){
		if (window.localStorage && window.localStorage.quiz){
			// window.localStorage.quiz = JSON.stringify({})
			let oldData = JSON.parse(window.localStorage.quiz)
			this.setState({value: oldData.name})
		}
	}

	render(){
		const { value } = this.state
		return(
			<div className="nameTeamContainer">
				<h4 className="title">What shall we call you?</h4>
				<TextInput 
					value={value} 
					onChange={this.onChange.bind(this)}
					onContinue={this.onContinue.bind(this)}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.player.users,
	room: state.player.room,
	usersSelected: state.player.usersSelected
})

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameTeam)