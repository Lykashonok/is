import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { UserManager } from '../../Classes/UserManager';
import { connect } from 'react-redux';
import { AppState } from 'src/Redux/store/configureStore';
import { Customer, CommonUser, Seller } from '../../Classes/User';
import { navigationProps } from 'src/Interfaces/shortcuts';
import AirButton from '../../Components/AirButton';
import LineInputForm from '../../Components/LineInputForm';
import { AlertManager } from '../../Classes/AlertManager';

interface IRegisterScreenProps {
  navigation: navigationProps;
}

interface IRegisterScreenState {
  isLoading: boolean,
  email: string,
  type: string;
  image: string;
  adress: string;
  phone: string;
  name: string;
  password: string;
  password2: string;
}

const um = UserManager.getInstance()

type Props = IRegisterScreenProps & ILinkStateProps

class RegisterScreen extends Component<Props, IRegisterScreenState> {
  state = {
    isLoading: false,
    email: '',
    type: 'customer',
    image: '',
    adress: '',
    phone: '',
    name: '',
    password: '',
    password2: '',
  }

  async register() {
    let newUser: CommonUser;
    switch(this.state.type) {
      case 'seller':
        newUser = new Seller(
          0,'seller', this.state.adress, this.state.phone, this.state.email, '', this.state.name
        );
        break;
      default :
        newUser = new Customer(
          0,'customer', this.state.adress, this.state.phone, this.state.email, '', this.state.name
        );
        break;
    }
    if (this.state.password != this.state.password2) {
      AlertManager.alertHandler.alertWithType('error', 'Пароли должны совпадать!', '')
      return;
    }
    let user = await um.registrateUser(
      newUser,
      this.state.password,
      (isLoading) => this.setState({ isLoading })
    )
    let i = newUser.getInfo()
    this.props.user.setInfo(i.id, i.type, i.image, i.email, i.adress, i.phone, i.name)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ backgroundColor: 'white',  flex: 1}}>
            <View style={{justifyContent: 'space-around', flex: 1, alignItems: 'center'}}>
              {this.state.isLoading ? <ActivityIndicator size={'large'}/> : <Text style={[styles.header, styles.purple]}>Регистрация</Text>}
              <LineInputForm onChangeTextHandler={(text) => this.setState({ email: text })} placeholder={'Почта'} password={false} value={this.state.email} />
              <LineInputForm onChangeTextHandler={(text) => this.setState({ name: text })} placeholder={'Имя'} password={false} value={this.state.name} />
              <LineInputForm onChangeTextHandler={(text) => this.setState({ phone: text })} placeholder={'Телефон'} password={false} value={this.state.phone} phone={true} />
              <LineInputForm onChangeTextHandler={(text) => this.setState({ password: text })} placeholder={'Пароль'} password={true} value={this.state.password} />
              <LineInputForm onChangeTextHandler={(text) => this.setState({ password2: text })} placeholder={'Повторите пароль'} password={true} value={this.state.password2} />
              <LineInputForm onChangeTextHandler={(text) => this.setState({ adress: text })} placeholder={'Адресс'} password={false} value={this.state.adress} />
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                <View><AirButton opacity={this.state.type == 'seller' ? 1 : 0.2} onPressHandler={() => this.setState({ type: 'seller' })} text={'Продавец'} width={115} /></View>
                <View><AirButton opacity={this.state.type == 'customer' ? 1 : 0.2} onPressHandler={() => this.setState({ type: 'customer' })} text={'Покупатель'} width={115} /></View>
              </View>
              <AirButton onPressHandler={() => this.register()} text={'Зарегистрироваться'} width={200} />
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => navigate("Login")}
              >
                <Text>
                  Есть аккаунт ?
                    </Text>
                <Text style={styles.purple}>
                  Войти
                  </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

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