import React, {Component} from 'react';
import {Comment, CreateComment} from '../presentations'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../store/store'


class Comments extends Component {
    constructor(){
      super()
      this.state = {}
    }

    submitComment(comment){
      console.log('submitComment: ' + JSON.stringify(comment))
      let updateComment = Object.assign({}, comment)

      let zone = this.props.zones[this.props.index]
      updateComment['zone'] = zone._id

      APIManager.post('/api/comment', updateComment, (err, response) => {
          if(err){
            alert(err)
            return
          }
          const comment = response.result
          this.props.commentsRecieved([comment], zone)
      })
    }

  componentDidUpdate(){
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

  render(){
    const selectedZone = this.props.zones[this.props.index]

    let zoneName = null
    let commentList = null

    if(selectedZone != null ){
      zoneName = selectedZone.name

      let zoneComments =  this.props.commentsMap[selectedZone._id]
        if( zoneComments != null) {
          commentList = zoneComments.map((comment, i) => {
          return (
            <li key={i}><Comment currentComment={comment}/></li>
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

const stateToProps = (state) => {
  return {
    //comments: state.comment.list,
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,
    index: state.zone.selectedZone,
    zones: state.zone.list
  }
}

const dispatchToProps = (dispatch) => {
    return {
      commentsRecieved: (comments, zone) => dispatch(actions.commentsRecieved(comments, zone)),
      commentsCreated: (comment) => dispatch(actions.commentsCreated(comment))
    }
}

export default connect(stateToProps, dispatchToProps)(Comments)
