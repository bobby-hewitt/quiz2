import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ColorText } from 'components'
import './style.scss'

class Home extends Component {
	render(){
		return(
			<div className="home">
				<div className="section" onClick={this.props.push.bind(this, '/host')}>
					<ColorText text="Host" />
				</div>
				<div className="section" onClick={this.props.push.bind(this, '/p')}>
					<ColorText text="Player" />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)