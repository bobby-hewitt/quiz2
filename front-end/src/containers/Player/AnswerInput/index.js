import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import { Button, TextInput, BottomContainer, ColorText } from 'components'
import { sendAnswer } from 'containers/SocketListener/player'
import { setLoading } from 'actions/player'
class AnswerInput extends Component {

	constructor(props){
		super(props)
		this.state = {
			answer: ''
		}
	}

	onContinue(){
		const { answer } = this.state
		const { room, id } = this.props

		const data = {
			answer: answer.toLowerCase(),
			room,
			id
		}
		this.setState({answer: ''}, () => {
			sendAnswer(this, data)
		})
		

	}

	onChange(key, e){
		this.setState({[key]: e.target.value})
	}
	
	render(){
		const { answer } = this.state
		return(
			<div className="answerInputContainer">
				<ColorText text="What's your guess?" letterStyle={{fontSize:'50px'}}/>
				<p className="title">You've got to be spot on. <br/>Letters, spaces and numbers only.</p>
				<TextInput 
					placeholder="Guess?"
					value={answer}
					onContinue={this.onContinue.bind(this)} 
					onChange={this.onChange.bind(this, 'answer')}
					/>
				<div>
					
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	id: state.player.id,
	room: state.player.room,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setLoading
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerInput)