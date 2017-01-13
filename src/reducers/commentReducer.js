import constants from '../constants/constants'

var initialState = {
    map: {}
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  let updatedMap = Object.assign({}, updated.map)


  switch(action.type) {

    case constants.COMMENTS_RECIEVED:
      console.log('COMMENTS_RECIEVED FROM ZONE: ' + JSON.stringify(action.zone))

        let zoneComments = (updatedMap[action.zone._id]) ? Object.assign([], updatedMap[action.zone._id]) : []

        action.comments.forEach((comment, i) => {
              zoneComments.push(comment)
        })
        updatedMap[action.zone._id] = zoneComments
        updated['map'] = updatedMap

        //console.log('COMMENTS_RECIEVED:  ' + JSON.stringify(updated))

        return updated

    case constants.COMMENTS_CREATED:
        console.log('COMMENTS_CREATED: ' + JSON.stringify(action.comment))
        let commentList = updatedMap[action.comment.zone]
        if(commentList == null)
           commentList = []
        else
          commentList = Object.assign([], commentList)

        commentList.push(action.comment)

        updatedMap[action.comment.zone] = commentList
        updated['map'] = updatedMap

        return updated

    case constants.COMMENT_UPDATED:
      console.log('COMMENT_UPDATED: ' + JSON.stringify(action.comment))
      let list = updatedMap[action.comment.zone]
      let newList = []

      list.forEach((comment, i) => {
        if(comment._id == action.comment._id)
            newList.push(action.comment)
        else
            newList.push(comment)
      })
      updatedMap[action.comment.zone] = newList
      updated['map'] = updatedMap


      return updated

    case constants.SELECT_ZONE:

        return updated


    default:
        return state

  }
}
