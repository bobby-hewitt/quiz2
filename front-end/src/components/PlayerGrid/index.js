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
		const { players, title, room } = this.props
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
				
				<div className="playersModalBackground">
					<div className="playersInner">
						<div className="playersInnerChevron" />
						{rows.map((color, i) => {
							// if (players[i] && players[i].name){
								return(						
									<Player pointsSound={this.props.pointsSound}key={i} color={color} index={i} {...players[i]} />
								)
							// } else {
								// return <div />
							// }
						})}
					</div>
					<div className="filler">
					</div>
				</div>

			</div>
		)
	}
}