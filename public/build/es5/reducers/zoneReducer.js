"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  selectedZone: 0,
  list: []
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updated = Object.assign({}, state);

  switch (action.type) {

    case constants.ZONES_RECIEVED:
      //console.log('ZONES_RECIEVED: ' + JSON.stringify(action.zones))
      updated.list = action.zones;
      return updated; // this is the equivalent to this.setState(...)

    case constants.ZONES_CREATED:
      //console.log('ZONES_CREATED: ' + JSON.stringify(action.zone))
      var updatedList = Object.assign([], updated.list);
      updatedList.push(action.zone);
      updated.list = updatedList;

      return updated;

    case constants.SELECT_ZONE:
      updated.selectedZone = action.selectedZone;
      return updated;


    default:
      return state;

  }
};