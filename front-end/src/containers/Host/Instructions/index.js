import React, { Component } from 'react'
// import './style.scss'

export default class Instructions extends Component {

	constructor(props){
		super(props)
		this.timeouts = []
	}
	componentDidMount(){
		this.timeouts[0] = setTimeout(() => {
			this.props.complete()
		},100)
	}
	componentWillUnmount(){
		for (var i = this.timeouts.length - 1; i >= 0; i--) {
			clearTimeout(this.timeouts[i])
		}
	}
	render(){
		return(
			<h4>Instructions</h4>
		)
	}
}