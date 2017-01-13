import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { Link } from 'react-router'


class Account extends Component {
  constructor(){
      super()
      this.state = {
          profile: {
            username: '',
            password: '',
            city: '',
            gender: ''

          }
      }
  }

  componentDidMount(){

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

logIn(event){
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

  APIManager.post('/account/login', this.state.profile, (err, response) => {
      if(err){
        alert(err.message)
        return
      }
      console.log(JSON.stringify(response))
      this.props.currentUserRecieved(response.user)
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

  APIManager.post('/account/register', this.state.profile, (err, response) => {
      if(err){
        alert(err.message)
        return
      }
      console.log(JSON.stringify(response))
      this.props.currentUserRecieved(response.user)
  })
}

logOut(event){
  event.preventDefault()
  APIManager.get('/account/logout', null, (err, response) => {
    if(err){
      alert(err)
      return
    }
    console.log('LOGGED OUT' + JSON.stringify(response))
    this.props.currentUserRecieved(null)

  })
}

  render(){
    //const greeting = (this.props.user == null) ? null : <h2>Welcome {this.props.user.username}</h2>
    let content = null
    if (this.props.user == null){
      content = (
      <div>
          <h2>Login</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Username"/><br/>
          <input id="password" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Password"/><br/>
          <button onClick={this.logIn.bind(this)} className="btn btn-primary">Log In</button>
          <br/>
          <h2>Sign Up</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Username"/><br/>
          <input id="password" onChange={this.updateProfile.bind(this)} className="form-control" type="password" placeholder="Password"/><br/>
          <input id="city" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="City"/><br/>
          <input id="gender" onChange={this.updateProfile.bind(this)} className="form-control" type="text" placeholder="Gender"/><br/>
          <button onClick={this.signUp.bind(this)} className="btn btn-primary">Sign Up</button>
      </div>
              )

    } else {
      content = <div>
                  <h2>Welcome {this.props.user.username}</h2>
                  <h2>Cityy {this.props.user.city}</h2>
                  <button onClick={this.logOut.bind(this)} className="btn btn-warning">Log Out</button>
                  <Link to="/currentuser"><button className="btn btn-primary">Account</button></Link>
              </div>
    }
    return(
      <div>
        { content }
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
     currentUserRecieved: (user) => dispatch(actions.currentUserRecieved(user))
   }
}

export default connect(stateToProps, dispatchToProps)(Account)
