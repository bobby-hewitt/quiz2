import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { BackButton, Button, TextInput, BottomContainer, ColorText } from 'components'
import { joinRoom } from 'containers/SocketListener/player'
import { setLoading } from 'actions/player'


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
		joinRoom(this, {room: roomcode, name: name})
		// this.props.push('/p/waiting-start')
	}

	onChange(key, e){
		var value;
		if (key === 'roomcode'){
			value = e.target.value.toUpperCase()
		} else {
			value = e.target.value.slice(0,7)
		}
		this.setState({[key]: value})
	}

	render(){
		const { name, roomcode } = this.state
		return(
			<div className="loginContainer">
				<ColorText text="Let's go" letterStyle={{fontSize:'50px'}}/>
				<TextInput 
					placeholder="Name"
					value={name} 
					onChange={this.onChange.bind(this, 'name')}
					/>
				<TextInput 
					placeholder="Roomcode"
					value={roomcode} 
					onContinue={this.onContinue.bind(this)}
					onChange={this.onChange.bind(this, 'roomcode')}
					/>
				<div>
					
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
  	setLoading
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameTeam)