import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Player, ColorText } from 'components'
import { setGameState, setScreenLoadingState, nextQuestion } from 'actions/host'
import { sendQuestionInput } from 'containers/SocketListener/host'
import './style.scss'
const colors = [
	'#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58','#DB4437'
]

class End extends Component {

	constructor(props){
		super(props)
		this.timeouts = []
		this.state = {
			visible: -1
		}
	}

	componentWillMount(){
		const { players } = this.props
		const newPlayers = players.sort(function(a, b){return b.score-a.score})
		this.setState({players: newPlayers})
	}

	componentDidMount(){
		this.showPlayer(0)
	}

	showPlayer(index){
		const { players } = this.props
		this.timeouts[index] = setTimeout(() => {
			this.setState({visible: index}, () => {
				if (players[index +1 ] && players[index + 1].name){
					this.showPlayer(index +1)
				} else {
					setTimeout(() => {
						sendQuestionInput(this)
						this.props.nextQuestion()
						this.props.push('/host/question-input')
					}, 5000)
				}
			})
		},500)
	}

	componentWillUnmount(){
		for (var i = this.timeouts.length - 1; i >= 0; i--) {
			clearTimeout(this.timeouts[i])
		}
	}


	render(){
		const { players } = this.state
		return(
			<div className="hostEndContainer">
				<ColorText text="The scores"/>
				<div className="finalPlayerOuterContainer">
				{players && players.map((player, i) => {
					return(
						<div key={i}className={`finalPlayerInnerContainer ${this.state.visible >= i && 'isVisible'}`}>
							<h4 className="position">#{i+1}</h4>
							<Player color={colors[i]}key={i} {...player} large showScores/>
						</div>
					)
				})}
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	players: state.host.players,
	sounds: state.sounds,
	hostRoom: state.host.room,
	questionIndex: state.host.questionIndex
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setGameState, 
  nextQuestion,
  setScreenLoadingState 

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(End)