import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { UserManager } from '../../Classes/UserManager';
import { connect } from 'react-redux';
import { AppState } from 'src/Redux/store/configureStore';
import { Customer, CommonUser } from '../../Classes/User';
import { navigationProps } from 'src/Interfaces/shortcuts';

interface IRegisterScreenProps {
    navigation: navigationProps;
}

interface IRegisterScreenState {

}

const um = UserManager.getInstance()

type Props = IRegisterScreenProps & ILinkStateProps

class RegisterScreen extends Component<Props, IRegisterScreenState> {
  state = {
    isLoading: false
  }

  async register() {
    let newUser = await um.registrateUser(
      new Customer(
          0, 'customer', 
          'zxcv', 'zxcv', 
          'zxcv@zxcv.zxcv', 
          'zxcv', 
          'zxcv'
        ), 
        '123',
        (isLoading) => this.setState({ isLoading })
      )
      let i = newUser.getInfo()
      this.props.user.setInfo(i.id, i.type, i.image, i.email, i.adress, i.phone, i.name)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the RegisterScreen.</Text>
        {this.state.isLoading ? <ActivityIndicator/> : <></>}
        <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
                To login screen
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.register()}>
            <Text>
                Register user
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IRegisterScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(RegisterScreen)