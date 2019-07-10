import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReactComponent as User } from 'assets/images/svg/user.svg'
import './style.scss'
import { Button } from 'components'



class WaitingStart extends Component {

	onClick(){
		this.props.push('/p/select-team')
	}
	render(){
		const { users } = this.props
		return(
			<div className="playerWaitingStartContainer">
				<h4 className="title">Sit tight, Let us know when everyone is in.</h4>
				<Button text="Everybody's in" onClick={this.onClick.bind(this)}/>
			</div>

		)
	}
}

const mapStateToProps = state => ({
	users: state.player.users,
	usersSelected: state.player.usersSelected
})

const mapDispatchToProps = dispatch => bindActionCreators({
	//
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingStart)