import constants from '../constants/constants'

export default {
  commentsRecieved: (comments, zone) => {
    return {
      type: constants.COMMENTS_RECIEVED,
      comments: comments,
      zone: zone
    }
  },
  commentsCreated: (comment) => {
    return {
      type: constants.COMMENTS_CREATED,
      comment: comment
    }
  },

  zonesRecieved: (zones) => {
    return {
      type: constants.ZONES_RECIEVED,
      zones: zones
    }
  },

  zonesCreated: (zone) => {
    return {
      type: constants.ZONES_CREATED,
      zone: zone
    }
  },
  selectZone: (index) => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    }
  },
  currentUserRecieved: (user) => {
    return {
      type: constants.CURRENT_USER_RECIEVED,
      user: user
    }
  }
}
