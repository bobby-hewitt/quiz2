import React, { Component } from 'react'
import Points from './points'
import './style.scss'

export default class Player extends Component {

	constructor(props){
		super(props)
		this.state = {
			showPoints: false
		}
	}

	showPoints(){
		clearTimeout(this.timeout)
		this.setState({showPoints:true}, () => {
			this.timeout = setTimeout(() => {
				this.setState({showPoints: false})
			}, 800)
		})
	}

	componentWillReceiveProps(np){
		if ((np.score && (this.props.score || this.props.score === 0)) && np.score > this.props.score){
			if (this.props.pointsSound){
				this.props.pointsSound.play()
			}
			this.showPoints()

		}
	}
	render(){
		const { name, image, planet, isConnected, color, index, score, hasSubmitted, large, showScores } = this.props
		const playerImage = !isConnected ? require('assets/images/png/disconnected.png') : image
		return(
			<div className={`hostPlayerOuterContainer ${large && 'large'}  ${name && 'isVisible'}`}>
			<div 
				className={`hostPlayerContainer ${!isConnected && 'isDisconnected'} ${large && 'large'}`}
				>
				<div className={`playerCircle ${large && 'large'}`} style={image ? {backgroundImage:'url(' + playerImage + ')'} : {background:color}}>
					
						{/*<p>{name && name[0] && name[0].toUpperCase() ? name[0].toUpperCase() : '?'}</p>*/}

					

				</div>
				<p className="name">{name || `Player ${index + 1}`}</p>
				{showScores &&
					<p className="score">{score || 0}</p>
				}
			</div>
			{this.state.showPoints && 
				
				<Points large={large}/>

			}
			</div>
		)
	}
}