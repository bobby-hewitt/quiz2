import React, { Component } from 'react'
import './style.scss'
import { Player } from 'components' 

const grid = [
	[0,1,2],
	[3,4,5],
	[6,7,8]
]

export default class Grid extends Component {



	render(){
		const { players } = this.props
		console.log(this.props.children)
		return(
			<div className="gridContainer">
				{grid.map((row, i) => {
					return(
						<div key={i} className="gridRow">
							{row.map((cell, j) => {
								return(
									<div key={`${i}${j}`} className="cell">
										{players[cell] && 
											
											
											<Player planet={require(`assets/images/png/planets/planet${cell}.png`)} {...players[cell]} />
					
										}
										
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		)
	}
}