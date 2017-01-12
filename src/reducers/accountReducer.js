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

      case constants.PROFILE_UPDATED:
      console.log('PROFILE_UPDATED: ' + JSON.stringify(action.profile))
      if(action.profile._id != updated.user._id)
      return

      updated['user'] = action.profile

      return updated


      default:
        return state

    }
}
