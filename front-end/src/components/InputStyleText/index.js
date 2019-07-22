import React, { Component } from 'react'
import './style.scss'

export default class InputStyleText extends Component {


	constructor(props){
		super(props)
		
	}

	render(){
		const { secondaryText, primaryText, containerStyle, isVisible, correct, incorrect, isLike, onClick } = this.props


		return(
			<div onClick={onClick ? onClick.bind(this) : () => {return}}className={`inputStyleTextContainer ${isVisible && 'inputContainerExpanded'} ${correct && 'correct'} ${incorrect && 'incorrect'}`} >
				<p className="inputText"><span className="secondary">{secondaryText} </span>{primaryText}</p>
				{!correct && !incorrect && !isLike &&
					<img className="image" src="http://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png" />
				}
				{isLike && 
					<p className="image">👍</p>
				}
				{correct && !isLike &&
					<p className="image">👌</p>
				}
				{incorrect && 
					<p className="image">😔</p>
				}
				
			</div>
		)
	}
}