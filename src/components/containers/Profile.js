import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Profile extends Component {
          constructor(){
            super()
            this.state = {
                profile: null
            }
          }

  componentDidMount(){
    APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
      if(err){
        alert(err)
        return
      }
      console.log('componentDidMount'+ JSON.stringify(response.results[0]))
      if(response.results.length == 0){
        alert('Profile Not Found, check spelling')
      }
      const profile = response.results[0]
      this.setState({
        profile: profile
      })


    })

  }


  render(){
    const header = (this.state.profile == null) ? null : <h1>{this.state.profile._id}</h1>
    return(
      <div>
        <h2>This is the Profile Container</h2>
        {header}
      </div>

    )
  }
}

export default Profile
