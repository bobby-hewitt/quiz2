import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User, Button, BackButton } from 'components'
import { toggleUserSelect } from 'actions/player'
import './style.scss'



class Player extends Component {

	constructor(props){
		super(props)
		this.timeouts = []
		this.state = {
			visible: 0,
		}
	}

	componentDidMount(){
		this.timeouts[0] = setTimeout(() => {
			for (var i = 0; i < 12; i++){
				this.updateVisible(i)
			}
		}, 300)
		
	}

	updateVisible(index){
		this.timeouts[index + 1] = setTimeout(() => {
			if (index === 11) return this.setState({visible: this.props.users.length})
			this.setState({visible: this.state.visible + 1})
		}, index *100)
	}

	componentWillUnmount(){
		for (var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}


	onClickUser(index){
		this.props.toggleUserSelect(index)
	}
	onContinue(){
		return this.props.push('/p/name-team')
	}
	render(){
		const { users, usersSelected }= this.props
		return(
			<div className="">
				<BackButton />
				<h4 className="title">Who's in your team?</h4>
				<p className="secondaryMeta">3 to 4 players recommended</p>
				<div className="usersContainer">
					{users && users.map((user, i) => {
						return(
							<User 
								isVisible={i < this.state.visible}
								isSelected={user.isSelected}
								key={i} 
								index={i} 
								onClick={this.onClickUser.bind(this)}
								{...user.profile[0]} />		
						)
					})}
				</div>
				<div className={`continueContainer ${usersSelected && 'isActive'}`}>
					<Button text="Continue" onClick={this.onContinue.bind(this)}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.player.users,
	usersSelected: state.player.usersSelected
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleUserSelect

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)