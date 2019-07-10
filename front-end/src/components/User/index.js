import React, { Component } from 'react'
import './style.scss'
import { ReactComponent as Tick } from 'assets/images/svg/tick.svg'

export default class User extends Component {
	render(){
		const { display_name, first_name, image_192, onClick, index, isSelected, isVisible} = this.props
		return(
			<div className={`userContainer ${isVisible && 'isVisible'}`} onClick={onClick.bind(this, index)}>
				<div className="userContainerInner">
					<div className="imageContainer">
						<img src={image_192} />
						<div className={`selected ${isSelected && 'isSelected'}`} >
							<Tick className="tick"/>
						</div>
					</div>
					<p className="userName">{first_name || display_name}</p>
				</div>
			</div>
		)
	}
}