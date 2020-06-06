import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';
import { Icon } from 'react-native-elements';

interface IAccountScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface IAccountScreenState {

}

class AccountScreen extends Component<IAccountScreenProps, IAccountScreenState> {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the AccountScreen.</Text>
        <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
                To login screen
            </Text>
            <Icon name="rocket"></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AccountScreen