import React, {Component} from 'react'

class Comment extends Component {
  render(){
    return (

      <div>

        <b>{this.props.currentComment.username}</b>
        <p>{this.props.currentComment.body}</p>
        <p>{this.props.currentComment.timestamp}</p>


      </div>
    )
  }
}

export default Comment
