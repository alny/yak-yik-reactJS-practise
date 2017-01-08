import React, {Component} from 'react';
import {Comment, CreateComment} from '../presentations'
import { APIManager } from '../../utils'

class Comments extends Component {
    constructor(){
      super()
      this.state = {
          list: []
      }
    }
    componentDidMount(){
      console.log('componentDidMount: ')
      APIManager.get('/api/comment', null, (err, response) => {
        if(err){
          alert('ERROR' + err.message)
          return
        }
        console.log('RESULTS: ' + JSON.stringify(response.results))
        this.setState({
          list: response.results
        })
      })
    }

    submitComment(comment){
      console.log('submitComment: ' + JSON.stringify(comment))
      APIManager.post('/api/comment', comment, (err, response) => {
          if(err){
            alert(err)
            return
          }
          console.log(JSON.stringify(response));
          let updatedList = Object.assign([], this.state.list)
          updatedList.push(response.result)
          this.setState({
            list: updatedList
          })
      })
    }

  render(){
  const commentList = this.state.list.map((comment, i) => {
    return (
      <li key={i}><Comment currentComment={comment}/></li>
    )
  })
    return (
      <div>
        <h1>Comment: Zone 1</h1>
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
export default Comments
