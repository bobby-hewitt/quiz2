import React, { Component } from 'react'
import './style.scss'
import { sendLike } from 'containers/SocketListener/player'
import { Player, InputStyleText, Button } from 'components'
import Waiting from '../Waiting'
export default class Likes extends Component {



	like(index){
		const { likes, room} = this.props
		if (!likes.isSelected){
			console.log('liking')
			const data = { 
				like: likes,
				room: room
			}
			sendLike(data)
			var newLikes = Object.assign({}, likes)
			newLikes.isSelected = true
			this.props.setLikes(newLikes)
		}
		
		
	}
	render(){
		const { likes} = this.props
		console.log('likes', likes)
			

					
		if (likes.answer && likes.answer !== 'pass'){
			return (
				<div  className={`likeContainer ${likes.isSelected && 'isSelected'}`} >
					<Player {...likes} large/>

					<InputStyleText isLike onClick={this.like.bind(this)} correct={likes.isSelected} isVisible primaryText={likes.answer || '❌'} containerStlye={{margin:'0px', marginTop:'-30px', height:'60px'}}/>
				
					
				</div>
			)
		} else {
			return <Waiting />
		}
				
		
		
	}
}