import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

interface IPreOrderScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IPreOrderScreenState {

}

class PreOrderScreen extends Component<IPreOrderScreenProps, IPreOrderScreenState> {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the PreOrderScreen.</Text>
        <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
                To login screen
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PreOrderScreen