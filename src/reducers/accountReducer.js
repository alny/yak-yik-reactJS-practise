import constants from '../constants/constants'

var initialState = {
      user: null

}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

    switch(action.type) {

      case constants.CURRENT_USER_RECIEVED:
      console.log('CURRENT_USER_RECIEVED: ' + JSON.stringify(action.user))
      updated['user'] = action.user

      return updated


      default:
        return state

    }
}
