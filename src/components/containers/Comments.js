import React, {Component} from 'react';
import Comment from '../presentations/Comment'

class Comments extends Component {
    constructor(){
      super()
      this.state = {
          comment: {
              username: '',
              body: ''
          },
          list: []
      }
    }

    submitComment(){
      console.log('Hi from Submit Comment :-)' + JSON.stringify(this.state.comment))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(this.state.comment)

      this.setState({
        list: updatedList
      })
    }

    updateUsername(event){
      console.log('updateUsername Hello bud ;-)' + event.target.value)
      let updatedUsername = Object.assign({}, this.state.comment)
      updatedUsername['username'] = event.target.value
      this.setState({
        comment: updatedUsername
      })

    }
    updateBody(event){
      console.log('updateComment Hello bud ;-)' + event.target.value)
      let updatedComment = Object.assign({}, this.state.comment)
      updatedComment['body'] = event.target.value
      this.setState({
        comment: updatedComment
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

            <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username"/><br/>
            <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment"/><br/>
            <button onClick={this.submitComment.bind(this)} className="btn btn-success">Submit Comment</button>

        </div>
      </div>
    )
  }
}
export default Comments
