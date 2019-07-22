import React, { Component } from 'react'
import Points from './points'
import Likes from './likes'
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
		const { name, image, planet, disconnected, color, index, score, hasSubmitted, large, showScores, showLikeAnimation, likes, showLikes, answer, hideName, mostLiked } = this.props
		const playerImage = disconnected ? require('assets/images/png/disconnected.png') : image
		const scoreToShow = score || 0
		
		return(
			<div className={`hostPlayerOuterContainer ${large && 'large'}  ${name && 'isVisible'}`}>
			
			<div className={`hostPlayerContainer  ${large && 'large'} ${hideName && 'hideName'}`}>
				<div className={`playerCircle ${large && 'large'} ${disconnected && 'disconnected'}`}   style={image ? {backgroundImage:'url(' + playerImage + ')'} : {background:color}}>
					{/*mostLiked && 
						<div className="mostLikedContainer">
							<p><span>👍</span></p>
						</div>
					*/}
				</div>
				{!hideName &&
					<p className="name">{name || `Player ${index + 1}`}</p>
				}
				{showScores &&
					<p className="score">{`Score: ${scoreToShow}`}</p>
				}
				{showLikeAnimation &&
					<Likes likes={likes}/>
				}
				{showLikes && answer && answer !== 'pass' &&
					<div className="playerDisplayedAnswerContainer">
						
						<p className="score">{`${likes}`}<span className="thumbsup">👍</span></p>
						
					</div>
				}
			</div>
			{this.state.showPoints && 
				
				<Points large={large}/>

			}
			
			</div>
		)
	}
}