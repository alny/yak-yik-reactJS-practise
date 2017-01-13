"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Link = require("react-router").Link;
var Account = (function (Component) {
  function Account() {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
    this.state = {
      profile: {
        username: "",
        password: "",
        city: "",
        gender: ""

      }
    };
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    componentDidMount: {
      value: function componentDidMount() {},
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(event) {
        event.preventDefault();
        console.log(event.target.id + " == " + event.target.value);
        var updatedProfile = Object.assign({}, this.state.profile);
        updatedProfile[event.target.id] = event.target.value;
        this.setState({
          profile: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    logIn: {
      value: function logIn(event) {
        var _this = this;
        event.preventDefault();
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
          alert("Please Enter your Username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("Please Enter your Password");
          return;
        }

        APIManager.post("/account/login", this.state.profile, function (err, response) {
          if (err) {
            alert(err.message);
            return;
          }
          console.log(JSON.stringify(response));
          _this.props.currentUserRecieved(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    signUp: {
      value: function signUp(event) {
        var _this = this;
        event.preventDefault();
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
          alert("Please Enter your Username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("Please Enter your Password");
          return;
        }

        APIManager.post("/account/register", this.state.profile, function (err, response) {
          if (err) {
            alert(err.message);
            return;
          }
          console.log(JSON.stringify(response));
          _this.props.currentUserRecieved(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    logOut: {
      value: function logOut(event) {
        var _this = this;
        event.preventDefault();
        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            alert(err);
            return;
          }
          console.log("LOGGED OUT" + JSON.stringify(response));
          _this.props.currentUserRecieved(null);
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        //const greeting = (this.props.user == null) ? null : <h2>Welcome {this.props.user.username}</h2>
        var content = null;
        if (this.props.user == null) {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              null,
              "Login"
            ),
            React.createElement("input", { id: "username", onChange: this.updateProfile.bind(this), className: "form-control", type: "text", placeholder: "Username" }),
            React.createElement("br", null),
            React.createElement("input", { id: "password", onChange: this.updateProfile.bind(this), className: "form-control", type: "text", placeholder: "Password" }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.logIn.bind(this), className: "btn btn-primary" },
              "Log In"
            ),
            React.createElement("br", null),
            React.createElement(
              "h2",
              null,
              "Sign Up"
            ),
            React.createElement("input", { id: "username", onChange: this.updateProfile.bind(this), className: "form-control", type: "text", placeholder: "Username" }),
            React.createElement("br", null),
            React.createElement("input", { id: "password", onChange: this.updateProfile.bind(this), className: "form-control", type: "password", placeholder: "Password" }),
            React.createElement("br", null),
            React.createElement("input", { id: "city", onChange: this.updateProfile.bind(this), className: "form-control", type: "text", placeholder: "City" }),
            React.createElement("br", null),
            React.createElement("input", { id: "gender", onChange: this.updateProfile.bind(this), className: "form-control", type: "text", placeholder: "Gender" }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.signUp.bind(this), className: "btn btn-primary" },
              "Sign Up"
            )
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              null,
              "Welcome ",
              this.props.user.username
            ),
            React.createElement(
              "h2",
              null,
              "Cityy ",
              this.props.user.city
            ),
            React.createElement(
              "button",
              { onClick: this.logOut.bind(this), className: "btn btn-warning" },
              "Log Out"
            ),
            React.createElement(
              Link,
              { to: "/currentuser" },
              React.createElement(
                "button",
                { className: "btn btn-primary" },
                "Account"
              )
            )
          );
        }
        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    currentUserRecieved: function (user) {
      return dispatch(actions.currentUserRecieved(user));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);