import React, {Component} from 'react';
import { AppRegistry } from 'react-native';

import Login from './components/Login';
import Secured from './components/Secured';

export default class App extends Component {

  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    message: ''
  }

  render() {

    if (this.state.isLoggedIn)
      return (<Secured
          onLogoutPress={() => this.setState({isLoggedIn: false})} />);
    else
      return (<Login
          onLoginPress={() => this.setState({isLoggedIn: true})} />);
  }
}
AppRegistry.registerComponent(App, () => App);
