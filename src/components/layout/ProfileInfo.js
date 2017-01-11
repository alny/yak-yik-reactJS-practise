import React, {Component} from 'react'
import { Profile } from '../containers'

class ProfileInfo extends Component {

  componentDidMount(){
    console.log('componentDidMount'+JSON.stringify(this.props.params))
  }
    render() {
        return (
            <div>
                <h2>Profile Info Layout</h2>
                <Profile username={this.props.params.username}/>
            </div>

        )
    }
}

export default ProfileInfo
