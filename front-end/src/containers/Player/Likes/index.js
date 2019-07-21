import React, { Component } from 'react'
import './style.scss'
import { sendLike } from 'containers/SocketListener/player'

export default class Likes extends Component {



	like(index){
		const { likes, room} = this.props
		if (likes[index] && !likes[index].isSelected){
			let newLikes = Object.assign( [], likes)
			const data = { 
				like: newLikes[index],
				room: room
			}
			sendLike(data)
			newLikes[index].isSelected = true
			this.props.setLikes(newLikes)
		}
		
	}
	render(){
		const { likes} = this.props
		return(
			<div className="likesContainer">
				<p className="title">Show some appreciation</p>
				{likes && likes.map((like, i) => {
					if (like.answer && like.answer !== 'pass'){
						return (
							<div key={i} className={`likeContainer ${like.isSelected && 'isSelected'}`} onClick={this.like.bind(this, i)}>
								<p className="answer">{like.answer}</p>
								<p className="thumbsup">👍</p>
							</div>
						)
					} else {
						return <div key={i} />
					}
				})}
			</div>
		)
	}
}