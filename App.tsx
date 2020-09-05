import React, { Component } from "react";
import Orientation from "react-native-orientation";
import AppNavigator from "./src/Navigators/AppNavigator";
import { Provider } from 'react-redux'
import { store } from './src/Redux/store/configureStore'
import DropdownAlert from "react-native-dropdownalert";
import { AlertManager } from "./src/Classes/AlertManager";
import { StatusBar } from "react-native";

const am = AlertManager.getInstance()

interface Props {}
export default class App extends Component<Props> {
  componentDidMount = () => {
    Orientation.lockToPortrait();
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', "Warning: componentWillMount", "Warning: Each"];
  };

  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={'purple'}></StatusBar>
        <AppNavigator/>
        <DropdownAlert ref={ref => {if (ref) am.registrateAlertHandler(ref)}}></DropdownAlert>
      </Provider>
    );
  }
}