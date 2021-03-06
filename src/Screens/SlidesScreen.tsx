import styles from '../Styles/main'
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

interface ISlidesScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface ISlidesScreenState {

}

class SlidesScreen extends Component<ISlidesScreenProps, ISlidesScreenState> {
  
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

export default SlidesScreen