import constants from '../constants/constants'

export default {
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
  }
}
