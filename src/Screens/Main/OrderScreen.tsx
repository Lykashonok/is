import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

interface IOrderScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IOrderScreenState {

}

class OrderScreen extends Component<IOrderScreenProps, IOrderScreenState> {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the HomeScreen.</Text>
        <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
                To login screen
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OrderScreen