import constants from '../constants/constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {

    switch(action.type) {
      case constants.ZONES_RECIEVED:
      console.log('ZONES_RECIEVED: ' + JSON.stringify(action.zones))
          let updated = Object.assign({}, state)
          updated['list'] = action.zones
          return updated // this is the equivalent to this.setState(...)

      default:
        return state

    }


}
