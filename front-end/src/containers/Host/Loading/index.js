import React, { Component } from 'react'
import './style.scss'

const colors = [
	'#4285F4', '#DB4437', '#0F9D58', '#F4B400'
]

export default class HostLoading extends Component {

	constructor(props){
		super(props)
		this.bits = this.createBits()
		this.timeout = false
		this.state = {
			visible: -1
		}
	}

	createBits(){
		const limit = 100
		var bits = []
		for (var i = 0; i < limit; i++){
			bits.push({
				color: colors[i%colors.length],
				x: Math.floor(Math.random() * 100) + '%',
				y: Math.floor(Math.random() * 100) + '%',
			})
		}
		return bits
	}


	componentWillReceiveProps(np){
		console.log()
		if (!this.props.loading&& np.loading){
			console.log('start of load')
			this.setState({visible: -1}, () => {
				this.load(0)
			})
		} else if (this.props.loading&& !np.loading){
			console.log('end of load')
			this.setState({visible: -1})
			clearTimeout(this.timeout)
		}
	}

	load(index){
		this.timeout = setTimeout(() => {
			if (index < this.bits.length -1){
				this.setState({visible: index})
				this.load(index + 1)
			}
		}, 100)
		
	}
	
	render(){
		return(
			<div className={`hostLoadingContainer ${this.state.visible > -1 && this.props.loading && 'visible'}`}>
				{this.props.loading && this.bits && this.bits.map((bit, i) => {
					return(
						<div key={i} className="loadingBit" 
							style={{
								position:'absolute',
								left:bit.x,
								top: bit.y,
								background: i < this.state.visible ? bit.color : 'transparent'
							}}
						/>
					)
				})}
			</div>
		)
	}
}