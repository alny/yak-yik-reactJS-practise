import React, {Component} from 'react'
import { Link } from 'react-router'

class Comment extends Component {
  constructor(){
    super()
    this.state = {
        isEditing: false,
        updated: null
    }
  }

  toggleEdit(event){
    event.preventDefault()
    if(this.state.updated != null){
       this.props.onUpdate(this.props.currentComment, this.state.updated)
    }
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  componentDidUpdate(){
    console.log('isEditing: ' + this.state.isEditing)
  }

  updatedBody(event){
    event.preventDefault()
    console.log('updatedBody: ' + event.target.value)
    this.setState({
      updated: event.target.value
    })
  }



  render(){
    const currentComment = this.props.currentComment
    const editable = (this.props.isEditable) ? this.props.isEditable : false

    let content = null

    if(this.state.isEditing == true){
      content = (
        <div>
          <div>
            <b><Link to={'/profile/'+currentComment.username}>{currentComment.username}</Link></b><br/>
            <textarea onChange={this.updatedBody.bind(this)} defaultValue={currentComment.body} className="form-control"></textarea><br/>
            <span>{currentComment.timestamp} </span>
            <button onClick={this.toggleEdit.bind(this)} className="btn btn-warning">Done</button>
          </div>
        </div>
      )
    } else {
      content = (
        <div>
          <b><Link to={'/profile/'+currentComment.username}>{currentComment.username}</Link></b><br/>
          <span>{currentComment.body}</span><br/>
          <span>{currentComment.timestamp} </span>
          {(editable) ? <button onClick={this.toggleEdit.bind(this)} className="btn btn-warning">Edit</button> : null}
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Comment
