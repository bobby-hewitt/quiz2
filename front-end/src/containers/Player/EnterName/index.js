import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { BackButton, Button, TextInput, BottomContainer } from 'components'
import { joinRoom } from 'containers/SocketListener/player'


class NameTeam extends Component {

	constructor(props){
		super(props)
		const prevData = window.localStorage.quiz ? JSON.parse(window.localStorage.quiz) : false
		console.log(prevData)
		this.state = {
			name: prevData && prevData.name ? prevData.name : '',
			roomcode: prevData && prevData.room ? prevData.room : '',
		}
	}

	onContinue(){
		const { roomcode, name } = this.state
		joinRoom({room: roomcode, name: name})
		this.props.push('/p/waiting-start')
	}

	onChange(key, e){
		console.log(key, e.target.value)
		this.setState({[key]: e.target.value})
	}
	
	render(){
		const { name, roomcode } = this.state
		return(
			<div className="nameTeamContainer">
				<h4 className="title">Let's get started</h4>
				<TextInput 
					placeholder="Name"
					value={name} 
					onChange={this.onChange.bind(this, 'name')}
					/>
				<TextInput 
					placeholder="Roomcode"
					value={roomcode} 
					onChange={this.onChange.bind(this, 'roomcode')}
					/>
				<div>
					<Button text="lets go" onClick={this.onContinue.bind(this)}/>
				</div>
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