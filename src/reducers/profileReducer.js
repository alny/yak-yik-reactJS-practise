import constants from '../constants/constants'

var initialState = {
  list: [],
  map: {},
  appStatus: 'ready'
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

    switch(action.type) {

      case constants.PROFILE_RECIEVED:
      console.log('PROFILE_RECIEVED: ' + JSON.stringify(action.profile))
      let updatedList = Object.assign([], state.list)
      updatedList.push(action.profile)
      updated['list'] = updatedList

      let updatedMap = Object.assign({}, state.map)
      updatedMap[action.profile.username] = action.profile
      updated['map'] = updatedMap

      updated['appStatus'] = 'ready' 

      return updated


      case constants.APPLICATION_STATE:
      console.log('APPLICATION_STATE: ' + JSON.stringify(action.status))
      updated['appStatus'] = action.status

      return updated


      default:
        return state

    }
}
