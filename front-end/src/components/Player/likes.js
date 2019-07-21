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
			console.log('getting a like')
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
						<div key={i} className="hostLikeContainer">
							<p className="thumbsup">👍</p>
						</div>
					)
				})}
			</div>
		)
	}
}