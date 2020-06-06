import React, { Component } from "react";
import Orientation from "react-native-orientation";
import AppNavigator from "./src/Navigators/AppNavigator";
import { Provider } from 'react-redux'
import { store } from './src/Redux/store/configureStore'
import DropdownAlert from "react-native-dropdownalert";
import { AlertManager } from "./src/Classes/AlertManager";

const am = AlertManager.getInstance()

interface Props {}
export default class App extends Component<Props> {
  componentDidMount = () => {
    Orientation.lockToPortrait();
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
        <DropdownAlert ref={ref => {if (ref) am.registrateAlertHandler(ref)}}></DropdownAlert>
      </Provider>
    );
  }
}