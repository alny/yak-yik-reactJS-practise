import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import Main from './components/Main'
//import { Home, ProfileInfo } from './components/layout'
//import { CurrentUser } from './components/containers'
import { Provider } from 'react-redux'
//import store from './store/store'
//import {Router, Route, IndexRoute, browserHistory } from 'react-router'

class App extends Component {
  render(){
    return(
      <Provider store={this.props.route.initial}>
        <Main {...this.props}/>
      </Provider>
    )
  }
}

export default App
