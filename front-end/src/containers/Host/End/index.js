import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Player, ColorText } from 'components'
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
		this.getMostLikes(newPlayers, (brandNewPlayers) => {
			this.setState({players: brandNewPlayers})
		})
		
	}

	getMostLikes(players, callback){
		
		var indexes = []
		var score = 0
		for (var i = 0; i < players.length; i++){
			if (players[i].likes > score){
				score = players[i].likes 
				indexes= [i]
			} else if (players[i].likes ===score){
				indexes.push(i)
			}
		}
		for (var i = 0; i < indexes.length; i++){
			players[indexes[i]].mostLiked = true
		}
		callback(players)
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
				<ColorText text="That's it!"/>
				<div className="finalPlayerOuterContainer">
				{players && players.map((player, i) => {
					return(
						<div key={i}className={`finalPlayerInnerContainer ${this.state.visible >= i && 'isVisible'}`}>
						<h4>#{i+1} {player.name} {player.mostLiked ? '👍🥇' : ''}</h4>
						<Player color={colors[i]}key={i} {...player} large showScores showLikes hideName/>
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(End)