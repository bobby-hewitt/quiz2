import React, { Component } from 'react'
import './style.scss'

export default class Likes extends Component {

	constructor(props){
		super(props)
		this.state = {
			show: [],
		}
	}

	componentWillReceiveProps(np){
		if (np.likes > this.props.likes){
			console.log('getting a like', (new Date().getMilliseconds()))
			const newShow = Object.assign([], this.state.show)
			newShow.push(true)
			this.setState({show: newShow})
		}
	}

	render(){
		const { show } = this.state 
		return(
			<div className="hostLikesContainer">
				{show && show.map((thumbsup, i) => {
					return(
						<div key={i} className="hostLikeContainer" style={{
							position:'absolute', 
							top: 180,
							left: Math.floor(Math.random() * 170)
						}}>
							<p className="thumbsup">👍</p>
						</div>
					)
				})}
			</div>
		)
	}
}