import styles from '../../Styles/main';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from 'src/Interfaces/shortcuts';
import { Customer, CommonUser, User } from '../../Classes/User';
import { AlertManager } from '../../Classes/AlertManager';
import { UserManager } from '../../Classes/UserManager';
import { Item, CompositeItem } from '../../Classes/Item';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions, UserActionTypes } from '../../Redux/types/actions';
import { setUser } from '../../Redux/Actions/user';
import { bindActionCreators } from 'redux';

interface ILoginScreenProps {
  navigation: navigationProps;
}

interface ILoginScreenState {
  isLoading: Boolean,
}

type Props = ILoginScreenProps & ILinkStateProps & ILinkDispatchProps

const um = UserManager.getInstance()

class LoginScreen extends Component<Props, ILoginScreenState> {
  state = {
    isLoading: false,
  }
  async componentDidMount() {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={async () => {
          let newUser = await um.loginUser('E', 'e', (isLoading) => this.setState({ isLoading }))
          this.props.setUser(newUser)
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

        <TouchableOpacity onPress={() => {
          let item: Item = new Item(1, 'biba')
          let item2: Item = new Item(2, 'boba')
          let item3: Item = new Item(3, 'lalal')
          let complicated: CompositeItem = new CompositeItem()
          complicated.add(item)
          complicated.add(item2)
          let complicated2: CompositeItem = new CompositeItem()
          complicated2.add(item3)
          complicated2.add(complicated)
          console.log(item)
          console.log(item2)
          console.log(item3)
          console.log(complicated)
          console.log(complicated2)
        }}>
          <Text>
            Test
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

interface ILinkDispatchProps {
  setUser: (user: CommonUser) => void;
}

const mapStateToProps = (state: AppState, ownProps: ILoginScreenProps): ILinkStateProps => ({
  user: state.user
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>, 
  ownProps: ILoginScreenProps
) => ({
  setUser: bindActionCreators(setUser, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)