import styles from '../../Styles/main';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { navigationProps } from 'src/Interfaces/shortcuts';
import { IUserProperties as User } from 'src/Redux/types/User';
import { AppState } from 'src/Redux/store/configureStore';

interface ILoginScreenProps {
    navigation: navigationProps;
}

interface ILoginScreenState {

}

type Props = ILoginScreenProps & ILinkStateProps

class LoginScreen extends Component<Props, ILoginScreenState> {

  componentDidMount() {
    
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("Login")}>
            <Text>
              Go to Login Screen
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

interface ILinkStateProps {
  user: User
}

const mapStateToProps = (state: AppState, ownProps: ILoginScreenProps) : ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(LoginScreen)