import React, { Component } from 'react'
import './style.scss'

export default class Player extends Component {
	render(){
		const { name, image, planet, isConnected, color, index, score, hasSubmitted } = this.props
		return(
			<div 
				className={`hostPlayerContainer ${!isConnected && 'isDisconnected'} `}
				>
				<div className="playerCircle" style={{background:color}}>
					
						<p>{name && name[0] && name[0].toUpperCase() ? name[0].toUpperCase() : '?'}</p>
					
					{/*hasSubmitted && 
						<p className="check">✅</p>
					*/}

				</div>
				<p className="name">{name || `Player ${index + 1}`}</p>
				<p className="score">{score || 0}</p>
			</div>
		)
	}
}