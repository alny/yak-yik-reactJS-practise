"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
        map: {},
        profileMap: {}
};

module.exports = function (_x, action) {
        var state = arguments[0] === undefined ? initialState : arguments[0];


        var updated = Object.assign({}, state);
        var updatedMap = Object.assign({}, updated.map);


        switch (action.type) {

                case constants.COMMENTS_RECIEVED:
                        console.log("COMMENTS_RECIEVED FROM ZONE: " + JSON.stringify(action.zone));

                        var zoneComments = updatedMap[action.zone._id] ? Object.assign([], updatedMap[action.zone._id]) : [];

                        action.comments.forEach(function (comment, i) {
                                zoneComments.push(comment);
                        });
                        updatedMap[action.zone._id] = zoneComments;
                        updated.map = updatedMap;

                        action.comments.forEach(function (comment, i) {
                                var profileComments = updatedProfileMap[comment.username] ? updatedProfileMap[comment.username] : [];
                                zoneComments.push(comment);
                        });

                        //console.log('COMMENTS_RECIEVED:  ' + JSON.stringify(updated))

                        return updated;

                case constants.COMMENTS_CREATED:
                        console.log("COMMENTS_CREATED: " + JSON.stringify(action.comment));
                        var commentList = updatedMap[action.comment.zone];
                        if (commentList == null) commentList = [];else commentList = Object.assign([], commentList);

                        commentList.push(action.comment);

                        updatedMap[action.comment.zone] = commentList;
                        updated.map = updatedMap;

                        return updated;

                case constants.COMMENT_UPDATED:
                        console.log("COMMENT_UPDATED: " + JSON.stringify(action.comment));
                        var list = updatedMap[action.comment.zone];
                        var newList = [];

                        list.forEach(function (comment, i) {
                                if (comment._id == action.comment._id) newList.push(action.comment);else newList.push(comment);
                        });
                        updatedMap[action.comment.zone] = newList;
                        updated.map = updatedMap;


                        return updated;

                case constants.SELECT_ZONE:


                        return updated;


                default:
                        return state;

        }
};