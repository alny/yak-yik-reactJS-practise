import constants from '../constants/constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

    switch(action.type) {

      case constants.ZONES_RECIEVED:
      console.log('ZONES_RECIEVED: ' + JSON.stringify(action.zones))
          updated['list'] = action.zones
          return updated // this is the equivalent to this.setState(...)

      case constants.ZONES_CREATED:
      console.log('ZONES_CREATED: ' + JSON.stringify(action.zone))
      let updatedList = Object.assign([], updated.list)
      updatedList.push(action.zone)
      updated['list'] = updatedList

      return updated

      default:
        return state

    }
}
