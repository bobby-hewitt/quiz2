import React, { Component } from 'react'
import './style.scss'
import SocketListener from '../SocketListener'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Player, Grid } from 'components'

class Host extends Component {
	render(){
		const { room , players} = this.props
		return(
			<div className="hostContainer">
				<SocketListener isHost/>
				<h4><span className="secondary">Room code: </span>{room? room.short : 'no room'}</h4>
				<Grid players={players}/>
				
			</div>
		)
	}
}

const mapStateToProps = state => ({
	room: state.host.room,
	players: state.host.players
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host)