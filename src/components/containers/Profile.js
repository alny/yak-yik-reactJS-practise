import React, { Component } from 'react'
import { APIManager } from '../../utils'
import {connect} from 'react-redux'
import actions from '../../actions/actions'

class Profile extends Component {
          constructor(){
            super()
            this.state = {
            }
          }

  componentDidMount(){
    let profile = this.props.profile[this.props.username]
    if(profile != null)
        return
    this.props.fetchProfile({username: this.props.username})
  }

  render(){
    let profile = this.props.profile[this.props.username]
    let header = null
    if(profile != null){
      header = (
        <div>
          <h1>Name: {profile.username}</h1>
          <h1>City: {profile.city}</h1>
          <h1>Gender: {profile.gender}</h1>

        </div>
      )

    }

    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header
    return(
      <div>
        <h2>This is the Profile Page</h2>
        {content}
      </div>

    )
  }
}

const stateToProps = (state) => {
  return {
      profile: state.profile.map,
      appStatus: state.profile.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
