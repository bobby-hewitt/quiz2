import React, { Component } from 'react'
import './style.scss'

export default class Player extends Component {
	render(){
		const { name, image, planet, isConnected } = this.props
		return(
			<div className={`hostPlayerContainer ${name && 'isAnimated'} ${!isConnected && 'isDisconnected'}`}>
				<div className="imageContainer">
					
					{/*<img className="planet" src={planet} />*/}
					<div className="planetCover">
					</div>
					{image && 
						<img className="alien"src={image} />
					}
				</div>
				<p className="name">{name || "?"}</p>
			</div>
		)
	}
}