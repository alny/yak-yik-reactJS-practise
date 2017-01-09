import React, { Component } from 'react'
import { APIManager } from '../../utils'


class Account extends Component {
  constructor(){
      super()
      this.state = {
          profile: {
            username: '',
            password: ''
          }
      }
  }

updateProfile(event){
  event.preventDefault()
  console.log(event.target.id + ' == ' + event.target.value)
  let updatedProfile = Object.assign({}, this.state.profile)
  updatedProfile[event.target.id] = event.target.value
  this.setState({
      profile: updatedProfile
  })
}

signUp(event){
  event.preventDefault()
  console.log(JSON.stringify(this.state.profile))
  if(this.state.profile.username.length == 0){
    alert('Please Enter your Username')
    return
  }
  if(this.state.profile.password.length == 0){
    alert('Please Enter your Password')
    return
  }

  APIManager.post('/api/profile', this.state.profile, (err, response) => {
      if(err){
        alert(err.message)
        return
      }
      console.log(JSON.stringify(response))
  })
}



  render(){
    return(
      <div>
          <h2>Login</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Username"/><br/>
          <input id="password" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Password"/><br/>
          <button className="btn btn-primary">Log In</button>
          <br/>
          <h2>Sign Up</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Username"/><br/>
          <input id="password" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Password"/><br/>
          <button onClick={this.signUp.bind(this)} className="btn btn-primary">Sign Up</button>
      </div>
    )
  }
}

export default Account
