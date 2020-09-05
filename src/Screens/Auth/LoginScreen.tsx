import styles from '../../Styles/main';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { Text, View, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { navigationProps } from 'src/Interfaces/shortcuts';
import { Customer, CommonUser, User } from '../../Classes/User';
import { AlertManager } from '../../Classes/AlertManager';
import { UserManager } from '../../Classes/UserManager';
import { Order, Caretaker } from '../../Classes/Order';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions, UserActionTypes } from '../../Redux/types/actions';
import { setUser } from '../../Redux/Actions/user';
import { bindActionCreators } from 'redux';
import LineInputForm from '../../Components/LineInputForm'
import AirButton from '../..//Components/AirButton';

interface ILoginScreenProps {
  navigation: navigationProps;
}

interface ILoginScreenState {
  isLoading: Boolean,
  email: string,
  password: string
}

type Props = ILoginScreenProps & ILinkStateProps & ILinkDispatchProps

const um = UserManager.getInstance()

class LoginScreen extends Component<Props, ILoginScreenState> {
  state = {
    isLoading: false,
    email: '',
    password: ''
  }
  async componentDidMount() {

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView style={[{backgroundColor: 'white', flex: 1}]} contentContainerStyle={{alignItems: 'center'}}>
          <Text style={[styles.title, {paddingVertical: '10%'}]}>
            IS
          </Text>
          <TouchableOpacity>
            {
              this.state.isLoading ? <ActivityIndicator /> : 
              <Text style={[styles.header, {color: 'purple', paddingVertical: '10%'}]}>
                Вход
              </Text>
            }
            
          </TouchableOpacity>
          <LineInputForm onChangeTextHandler={(text) =>this.setState({email: text})} placeholder='email' password={false}/>
          <LineInputForm onChangeTextHandler={(text) =>this.setState({password: text})} placeholder='password' password={true}/>
          <View style={{padding: 20}}>
            <AirButton
              onPressHandler={async () => {
                let newUser = await um.loginUser(this.state.email, this.state.password, (isLoading) => this.setState({ isLoading }))
                this.props.setUser(newUser)
                if (this.props.user.getId()) navigate("MainTabView")
              }}
              text="Войти"
              width={200}
            />
          </View>
          <TouchableOpacity onPress={() => navigate("Register")} style={{width: '100%', alignItems: 'center'}}>
              <Text>
                Нет аккаунта?
              </Text>
              <Text style={styles.purple}>
                Зарегистрироваться
              </Text>

          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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