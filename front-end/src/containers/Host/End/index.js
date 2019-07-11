import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Player } from 'components'
import './style.scss'

class End extends Component {
	render(){
		const { players } = this.props
		return(
			<div className="hostEndContainer">
				{players && players.map((player, i) => {
					return(
						<div className="finalPlayerOuterContainer">
						<h4>#{i+1}</h4>
						<Player key={i} {...player} />
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