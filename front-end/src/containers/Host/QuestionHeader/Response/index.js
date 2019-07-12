import React, { Component } from 'react'
import './style.scss'
import { Player, InputStyleText } from 'components'

export default class Response extends Component {

	constructor(props){
		super(props)
		this.timeouts =[]
		this.state = {
			isAnimatedIn: false
		}
	}

	componentDidMount(){
		const { timeout } = this.props
		this.timeouts[0] = setTimeout(() => {
			this.setState({isAnimatedIn: true}, () => {
				this.timeouts[1] = setTimeout(() => {
					this.setState({isAnimatedIn: false})
				}, timeout)
			})
		})
	}

	componentWillUnmount(){
		for(var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}
	render(){
		const { color, player, showRightWrong, bonus } = this.props
		return(
			<div className={`answersHeaderInner ${this.state.isAnimatedIn && 'isAnimated'}`}>
				<Player color={color}{...player} />
				<InputStyleText secondaryText="Answer: " primaryText={player.answer} containerStlye={{margin:'0px', marginTop:'-30px'}}/>
				{showRightWrong && 
					<h4 className="emoji">{showRightWrong === 'right' ? '✅' : '❌'}</h4>
				}
				{(bonus || bonus === 0) &&
					<h4 className="answer">{`500 bonus * ${bonus}`}</h4>	
				}
			</div>
		)
	}
}