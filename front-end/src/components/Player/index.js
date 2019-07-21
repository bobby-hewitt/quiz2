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
		const { name, image, planet, isConnected, color, index, score, hasSubmitted, large, showScores, likes, showLikes, answer, hideName } = this.props
		const playerImage = !isConnected ? require('assets/images/png/disconnected.png') : image
		const scoreToShow = score || 0
		if (this.props.large){
			console.log('answer', answer)
		}
		return(
			<div className={`hostPlayerOuterContainer ${large && 'large'}  ${name && 'isVisible'}`}>
			
			<div 
				className={`hostPlayerContainer ${!isConnected && 'isDisconnected'} ${large && 'large'} ${hideName && 'hideName'}`}
				>
				<div className={`playerCircle ${large && 'large'}`} style={image ? {backgroundImage:'url(' + playerImage + ')'} : {background:color}}>
					
						{/*<p>{name && name[0] && name[0].toUpperCase() ? name[0].toUpperCase() : '?'}</p>*/}

					

				</div>
				{!hideName &&
					<p className="name">{name || `Player ${index + 1}`}</p>
				}
				{showScores &&
					<p className="score">{`Score: ${score || 0}`}</p>
				}
				{showScores &&
					<Likes likes={likes}/>
				}
				{showLikes && answer && answer !== 'pass' &&
					<div className="playerDisplayedAnswerContainer">
						<p className="playerDisplayedAnswer">{answer}</p>
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