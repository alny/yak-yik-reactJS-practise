import constants from '../constants/constants'

var initialState = {
    map: {}
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type) {

    case constants.COMMENTS_RECIEVED:
      //  console.log('COMMENTS_RECIEVED FROM ZONE: ' + JSON.stringify(action.zone))



        let updatedMap = Object.assign({}, updated.map)
        let zoneComments = (updatedMap[action.zone._id]) ? Object.assign([], updatedMap[action.zone._id]) : []

        action.comments.forEach((comment, i) => {
              zoneComments.push(comment)
        })
        updatedMap[action.zone._id] = zoneComments
        updated['map'] = updatedMap

        //console.log('COMMENTS_RECIEVED:  ' + JSON.stringify(updated))

        return updated

    case constants.COMMENTS_CREATED:
        //console.log('COMMENTS_CREATED: ' + JSON.stringify(action.comment))

        return updated

    case constants.SELECT_ZONE:

        return updated

    default:
        return state

  }
}
