import React, {Component} from 'react';

class CreateZone extends Component {
  constructor(){
    super()
    this.state = {
        zone: {
          name: '',
          zipCode: ''
        },
    }
  }

updateZone(event){
  console.log('updateZone' + event.target.id + ' from ' + event.target.value)
  let updateZone = Object.assign({}, this.state.zone)
  updateZone[event.target.id] = event.target.value
  this.setState({
    zone: updateZone
  })
}

submitZone(event){
  let updated = Object.assign({}, this.state.zone)
  updated['zipCodes'] = updated.zipCode.split(',')
  this.props.onCreateZone(updated)
}

  render(){
    return(

      <div>
        <input id="name" onChange={this.updateZone.bind(this)} className="form-control"  placeholder="Zone"/><br/>
        <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="ZipCode"/><br/>
        <button onClick={this.submitZone.bind(this)} className="btn btn-warning">Add Zone</button>
      </div>

    )
  }
}

export default CreateZone
