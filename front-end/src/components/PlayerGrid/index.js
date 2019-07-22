import React, { Component } from 'react'
import './style.scss'
import { Player } from 'components' 
import PageTitle from 'containers/Host/PageTitle'
const rows = [
	'#4285F4','#DB4437','#F4B400','#4285F4','#0F9D58','#DB4437'
]
const grids = [
	'','','','','','','','','',
]

export default class Grid extends Component {




	render(){
		const { players, title, room, isVisible } = this.props
		console.log('player grid visible', isVisible)
		return(
			<div className="playersContainer">
				<div className="fakeMenu">
					<p className="fakeMenuItem">Mail</p>
					<p className="fakeMenuItem">Pictures</p>
					<div className="gridIcon">
						{grids.map((g, i) => {
							return (
								<div  key={i} className="gridIconSquare" />
							)
						})}
					</div>
					<div className="profileCircle">
						?
					</div>
				</div>
				
				<div className={`playersModalBackground ${isVisible && 'isVisible'}`}>
					<div className="playersInner">
						<div className="playersInnerChevron" />
						{players.map((player, i) => {
							if (window.location.pathname === '/host' || !player.isConnected){
								return(						
									<Player key={i} disconnected={window.location.pathname !== '/host'}  pointsSound={this.props.pointsSound}key={i} index={i} {...player} />
								)
							} else {
								return <div key={i}/>
							}
						})}
						{!players.length &&
							<p className="noPlayers">Where is everyone?</p>
						}
					</div>
					<div className="filler">
					</div>
				</div>

			</div>
		)
	}
}