import React, {Component} from 'react';
import {Comment, CreateComment} from '../presentations'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../store/store'


class Comments extends Component {
    constructor(){
      super()
      this.state = {
      }
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
          this.props.commentsCreated(response.result)
      })
    }

  componentDidUpdate(){
    let zone = this.props.zones[this.props.index]
    if(zone == null){
      console.log('NO SELECTED ZONE')
      return
    }

    if (this.props.commentsLoaded == true)
        return

    APIManager.get('/api/comment', { zone: zone._id }, (err, response) => {
      if(err){
        alert('ERROR' + err.message)
        return
      }
      //this.setState({ commentsLoaded: true })

      let comments = response.results
      this.props.commentsRecieved(comments)
      })
  }


  render(){
  const commentList = this.props.comments.map((comment, i) => {
    return (
      <li key={i}><Comment currentComment={comment}/></li>
    )
  })
  const selectedZone = this.props.zones[this.props.index]
  const zoneName = (selectedZone == null ) ? '' : selectedZone.name

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
    comments: state.comment.list,
    commentsLoaded: state.comment.commentsLoaded,
    index: state.zone.selectedZone,
    zones: state.zone.list
  }
}

const dispatchToProps = (dispatch) => {
    return {
      commentsRecieved: (comments) => dispatch(actions.commentsRecieved(comments)),
      commentsCreated: (comment) => dispatch(actions.commentsCreated(comment))
    }
}

export default connect(stateToProps, dispatchToProps)(Comments)
