import React, {Component} from 'react'
import { Link } from 'react-router'

class Comment extends Component {
  render(){
    const currentComment = this.props.currentComment
    return (

      <div>

        <b><Link to={'/profile/'+currentComment.username}>{currentComment.username}</Link></b>
        <p>{currentComment.body}</p>
        <p>{currentComment.timestamp}</p>


      </div>
    )
  }
}

export default Comment
