import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {


  fetchProfile: (params) => {
    return (dispatch) => {
        dispatch({
          type: constants.APPLICATION_STATE,
          status: 'loading'
        })

    APIManager.get('/api/profile', params, (err, response) => {
      if(err){
        console.log('ERROR: '+err)
        return
      }
      console.log('fetchProfile: ' + JSON.stringify(response))
      if(response.results.length == 0){
        alert('Profile Not Found, check spelling')
      }
      const profile = response.results[0]
      dispatch({
        type: constants.PROFILE_RECIEVED,
        profile: profile
      })
    })
  }
  },
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

  fetchZones: (params) =>{
    return (dispatch) =>{
      APIManager.get('/api/zone', params, (err, response) => {
        if(err){
          alert(err)
          return
        }
        console.log('fetchZone: ' + JSON.stringify(response))
        const zones = response.results
        dispatch({
          type: constants.ZONES_RECIEVED,
          zones: zones
        })
      })
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
  },
  updateProfile: (profile, updated) => {
    return (dispatch) => {


      const endpoint = '/api/profile/' + profile._id
      APIManager.put(endpoint, updated, (err, response) => {
        if(err){
          alert('ERROR: '+ JSON.stringify(err))
          return
        }
        const updatedProfile = response.result
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updatedProfile
        })
    //    console.log('Profile Updated: ' + JSON.stringify(response))
      })
    }
  }
}
