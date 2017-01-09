import constants from '../constants/constants'

var initialState = {
  commentsLoaded: false,
  list: []
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type) {

    case constants.COMMENTS_RECIEVED:
        updated['list'] = action.comments
        updated['commentsLoaded'] = true

        return updated

    case constants.COMMENTS_CREATED:
        console.log('COMMENTS_CREATED: ' + JSON.stringify(action.comment))
        let updatedList = Object.assign([], updated.list)
        updatedList.push(action.comment)
        updated['list'] = updatedList

        return updated

    case constants.SELECT_ZONE:
        updated['selectedZone'] = action.selectedZone
        updated['commentsLoaded'] = false

        return updated

    default:
        return state

  }
}
