import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import LineChart from './components/LineChart';

export default class App extends Component {
  render() {

      return (

        <LineChart>
        </LineChart>
      );
  }
}

