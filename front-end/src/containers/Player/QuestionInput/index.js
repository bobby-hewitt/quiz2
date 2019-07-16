import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { Button, TextInput, BottomContainer, ColorText } from 'components'
import { sendQuestion } from 'containers/SocketListener/player'
import { setLoading } from 'actions/player'
class NameTeam extends Component {

	constructor(props){
		super(props)
		this.state = {
			question: ''
		}
	}

	onContinue(){
		const { question } = this.state
		const { room } = this.props
		const data = {
			question,
			room
		}

		sendQuestion(this, data)
	}

	onChange(key, e){
		this.setState({[key]: e.target.value})
	}
	
	render(){
		const { question } = this.state
		return(
			<div className="questionInputContainer">
				<ColorText text="Question" letterStyle={{fontSize:'50px'}}/>
				<TextInput 
					placeholder="Search"
					value={question} 
					onContinue={this.onContinue.bind(this)}
					onChange={this.onChange.bind(this, 'question')}
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