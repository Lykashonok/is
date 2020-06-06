import styles from '../../Styles/main';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/Redux/store/configureStore';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from 'src/Interfaces/shortcuts';
import { Customer, CommonUser, User } from '../../Classes/User';
import { AlertManager } from '../../Classes/AlertManager';
import { UserManager } from '../../Classes/UserManager';

interface ILoginScreenProps {
  navigation: navigationProps;
}

interface ILoginScreenState {
  isLoading: Boolean,
}

type Props = ILoginScreenProps & ILinkStateProps

const um = UserManager.getInstance()

class LoginScreen extends Component<Props, ILoginScreenState> {
  state = {
    isLoading: false,
  }
  async componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
      return(
        <View style={styles.container}>
          <TouchableOpacity onPress={ async () => {
            let newUser = await um.loginUser( 'Й', 'Й', (isLoading) => this.setState({ isLoading }) )
            let i = newUser.getInfo()
            this.props.user.setInfo(i.id, i.type, i.image, i.email, i.adress, i.phone, i.name)
            console.log(this.props.user.getId())
            if (this.props.user.getId()) navigate("MainTabView")
          }}>
            {this.state.isLoading ? <ActivityIndicator /> : <></>}
            <Text>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
              Register
            </Text>
          </TouchableOpacity>
          
        </View>
      );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: ILoginScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(LoginScreen)