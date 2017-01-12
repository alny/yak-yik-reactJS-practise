import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'


class CurrentUser extends Component {
  constructor(){
    super()
    this.state = {
      updated: {

      }
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ' + JSON.stringify(this.props.user))

  }

  updateCurrentUser(event){
    event.preventDefault()
    console.log('updateCurrentUser: ' + event.target.value + ' == ' + event.target.id)
    let updatedProfile = Object.assign({}, this.state.updated)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      updated: updatedProfile
    })
  }

  updateProfile(){
    event.preventDefault()
    console.log('updateProfile: ' + JSON.stringify(this.state.updated))
    if(Object.keys(this.state.updated).length == 0){
      alert('No Changes Made')
      return
    }

      this.props.updateProfile(this.props.user, this.state.updated)
  }


  render(){
    const currentUser = this.props.user

    return(
      <div className="container">
        <h2>Welcome {currentUser.username}</h2>
        <input id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} type="text" className="form-control" placeholder="Username"/><br/>
        <input id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} type="text" className="form-control" placeholder="Gender"/><br/>
        <input id="city" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} type="text" className="form-control" placeholder="City"/><br/>
        <button onClick={this.updateProfile.bind(this)} className="btn btn-success">Update</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))
  }
}



export default connect(stateToProps, dispatchToProps)(CurrentUser)
