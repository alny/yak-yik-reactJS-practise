import React, {Component} from 'react';
import { APIManager } from '../../utils'
import {Zone, CreateZone} from '../presentations';

class Zones extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount(){
      console.log('componentDidMount: ')
      APIManager.get('/api/zone', null, (err, response) => {
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


    updateZone(event){
      console.log('updateZone: ' + event.target.id + ' == ' + event.target.value)
      let updatedZone = Object.assign({}, this.state.zone)
      updatedZone[event.target.id] = event.target.value
      this.setState({
          zone: updatedZone
      })
    }

    addZone(zone){
      APIManager.post('/api/zone', zone, (err, response) => {
        if(err){
          alert('ERROR: ' + err.message)
          return
        }
        console.log('ZONE CREATED' + JSON.stringify(response))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(response.result)
        this.setState({
          list: updatedList
        })
      })
    }

    render() {
      const listItems = this.state.list.map((zone, i) => {
        return (
          <li key={i}><Zone currentZone={zone}/></li>
        )
      })
        return (
            <div>
                <ol>
                  {listItems}
                </ol>
              <CreateZone onCreateZone = {this.addZone.bind(this)}/>

            </div>
        )
    }
}

export default Zones
