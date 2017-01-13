import React, {Component} from 'react';
import {Comment, CreateComment} from '../presentations'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'


class Comments extends Component {
    constructor(){
      super()
      this.checkForComments = this.checkForComments.bind(this)
      this.state = {
        commentsLoaded: false,
        index: 0
      }
    }

    submitComment(comment){
      if(this.props.user == null){
        alert('Please log in to comment')
        return
      }
      let updateComment = Object.assign({}, comment)

      let zone = this.props.zones[this.props.index]
      updateComment['zone'] = zone._id
      updateComment['username'] = this.props.user.username

      APIManager.post('/api/comment', updateComment, (err, response) => {
          if(err){
            alert(err)
            return
          }
          const comment = response.result
          this.props.commentsRecieved([comment], zone)
      })
    }

  checkForComments(){
    let zone = this.props.zones[this.props.index]
    if(zone == null){
      console.log('NO SELECTED ZONE')
      return
    }

    let commentsArray = this.props.commentsMap[zone._id]
    if (commentsArray != null) // Comments have already been loaded
        return

    APIManager.get('/api/comment', { zone: zone._id }, (err, response) => {
      if(err){
        alert('ERROR' + err.message)
        return
      }
      let comments = response.results
      this.props.commentsRecieved(comments, zone)
      })
  }

  componentDidMount(){
    this.checkForComments()
  }

  componentDidUpdate(){
    this.checkForComments()
  }

  updateComment(comment, updatedBody){
      console.log('updateComment: ' + comment._id + ', ' + updatedBody)
      this.props.updateComment(comment, {body: updatedBody})
  }

  render(){
    const selectedZone = this.props.zones[this.props.index]
    const currentUser = this.props.user // null if not logged in

    let zoneName = null
    let commentList = null

    if(selectedZone != null ){
      zoneName = selectedZone.name

      let zoneComments =  this.props.commentsMap[selectedZone._id]
        if( zoneComments != null) {
          commentList = zoneComments.map((comment, i) => {
            let editable = false
            if(currentUser != null){
              if(currentUser.username == comment.username)
              editable = true
            }

          return (
            <li key={i}><Comment onUpdate={this.updateComment.bind(this)} isEditable={editable} currentComment={comment}/></li>
            )
          })
        }
    }




    return (
      <div>
        <h1>{zoneName}</h1>
        <div style={{padding:12, background:'#f9f9f9', border:'1px solid #ddd'}}>
          <ul>
            {commentList}
          </ul>
              <CreateComment onCreateComment={this.submitComment.bind(this)}/>
        </div>
      </div>
    )
  }
}

// Get the state/data from the reducer and use it in the container
const stateToProps = (state) => {
  return {
    //comments: state.comment.list,
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    user: state.account.user
  }
}
// Trigger the event to go to the actions
const dispatchToProps = (dispatch) => {
    return {
      commentsRecieved: (comments, zone) => dispatch(actions.commentsRecieved(comments, zone)),
      commentsCreated: (comment) => dispatch(actions.commentsCreated(comment)),
      updateComment: (comment, params) => dispatch(actions.updateComment(comment, params))

    }
}

export default connect(stateToProps, dispatchToProps)(Comments)
