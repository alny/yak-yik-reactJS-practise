"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {


  fetchProfile: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading"
      });

      APIManager.get("/api/profile", params, function (err, response) {
        if (err) {
          console.log("ERROR: " + err);
          return;
        }
        console.log("fetchProfile: " + JSON.stringify(response));
        if (response.results.length == 0) {
          alert("Profile Not Found, check spelling");
        }
        var profile = response.results[0];
        dispatch({
          type: constants.PROFILE_RECIEVED,
          profile: profile
        });
      });
    };
  },
  commentsRecieved: function (comments, zone) {
    return {
      type: constants.COMMENTS_RECIEVED,
      comments: comments,
      zone: zone
    };
  },
  commentsCreated: function (comment) {
    return {
      type: constants.COMMENTS_CREATED,
      comment: comment
    };
  },
  updateComment: function (comment, params) {
    return function (dispatch) {
      var endpoint = "/api/comment/" + comment._id;
      APIManager.put(endpoint, params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }
        console.log(JSON.stringify(response));
        var updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  fetchZones: function (params) {
    return function (dispatch) {
      APIManager.get("/api/zone", params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }
        console.log("fetchZone: " + JSON.stringify(response));
        var zones = response.results;
        dispatch({
          type: constants.ZONES_RECIEVED,
          zones: zones
        });
      });
    };
  },

  zonesRecieved: function (zones) {
    return {
      type: constants.ZONES_RECIEVED,
      zones: zones
    };
  },

  zonesCreated: function (zone) {
    return {
      type: constants.ZONES_CREATED,
      zone: zone
    };
  },
  selectZone: function (index) {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    };
  },
  currentUserRecieved: function (user) {
    return {
      type: constants.CURRENT_USER_RECIEVED,
      user: user
    };
  },
  updateProfile: function (profile, updated) {
    return function (dispatch) {


      var endpoint = "/api/profile/" + profile._id;
      APIManager.put(endpoint, updated, function (err, response) {
        if (err) {
          alert("ERROR: " + JSON.stringify(err));
          return;
        }
        var updatedProfile = response.result;
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updatedProfile
        });
      });
    };
  }
};
//    console.log('Profile Updated: ' + JSON.stringify(response))