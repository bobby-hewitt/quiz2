import React, { Component } from 'react'
import './style.scss'

export default class TextInput extends Component {

	onContinue(){
		this.props.onContinue(this.refs.input.value)
	}


	render(){
		const { onContinue, value, placeholder, onChange } = this.props


		return(
			<div className="textInputContainer">
				<input placeholder={placeholder} type="text" ref="input" value={value} onChange={onChange}/>
				{onContinue &&
					<div className="continue" onClick={this.onContinue.bind(this)}>
						<img src={require('assets/images/svg/forward.svg')} />
					</div>
				}
				
			</div>
		)
	}
}