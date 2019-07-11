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
	render(){
		const { players } = this.props
		return(
			<div className="hostEndContainer">
				<ColorText text="That's all folks!"/>
				{players && players.map((player, i) => {
					return(
						<div className="finalPlayerOuterContainer">
						<h4>#{i+1}</h4>
						<Player color={colors[i]}key={i} {...player} />
						</div>
					)
				})}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	players: state.host.finalPlayers,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(End)