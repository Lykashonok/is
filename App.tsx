import React, { Component } from "react";
import Orientation from "react-native-orientation";
import AppNavigator from "./src/Navigators/AppNavigator";
import { Provider } from 'react-redux'
import { store } from './src/Redux/store/configureStore'

interface Props {}
export default class App extends Component<Props> {
  componentDidMount = () => {
    Orientation.lockToPortrait();
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}