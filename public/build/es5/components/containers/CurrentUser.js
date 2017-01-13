"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var CurrentUser = (function (Component) {
  function CurrentUser() {
    _classCallCheck(this, CurrentUser);

    _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);
    this.state = {
      updated: {}
    };
  }

  _inherits(CurrentUser, Component);

  _prototypeProperties(CurrentUser, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("componentDidMount: " + JSON.stringify(this.props.user));
      },
      writable: true,
      configurable: true
    },
    updateCurrentUser: {
      value: function updateCurrentUser(event) {
        event.preventDefault();
        console.log("updateCurrentUser: " + event.target.value + " == " + event.target.id);
        var updatedProfile = Object.assign({}, this.state.updated);
        updatedProfile[event.target.id] = event.target.value;
        this.setState({
          updated: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile() {
        event.preventDefault();
        console.log("updateProfile: " + JSON.stringify(this.state.updated));
        if (Object.keys(this.state.updated).length == 0) {
          alert("No Changes Made");
          return;
        }

        this.props.updateProfile(this.props.user, this.state.updated);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentUser = this.props.user;

        return React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "h2",
            null,
            "Welcome ",
            currentUser.username
          ),
          React.createElement("input", { id: "username", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.username, type: "text", className: "form-control", placeholder: "Username" }),
          React.createElement("br", null),
          React.createElement("input", { id: "gender", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.gender, type: "text", className: "form-control", placeholder: "Gender" }),
          React.createElement("br", null),
          React.createElement("input", { id: "city", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.city, type: "text", className: "form-control", placeholder: "City" }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.updateProfile.bind(this), className: "btn btn-success" },
            "Update"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CurrentUser;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    updateProfile: function (profile, updated) {
      return dispatch(actions.updateProfile(profile, updated));
    }
  };
};



module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);