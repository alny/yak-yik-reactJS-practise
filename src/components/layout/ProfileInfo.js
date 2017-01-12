import React, {Component} from 'react'
import { Profile } from '../containers'

class ProfileInfo extends Component {
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
