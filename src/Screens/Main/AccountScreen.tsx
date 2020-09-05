import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CommonUser } from '../../Classes/User'
import { navigationProps } from 'src/Interfaces/shortcuts';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';

interface IAccountScreenProps {
    navigation: navigationProps;
}

type Props = IAccountScreenProps & ILinkStateProps

interface IAccountScreenState {

}

class AccountScreen extends Component<Props, IAccountScreenState> {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={{height: 67, borderBottomWidth: 2, width: '100%', borderBottomColor: 'purple', alignItems: 'center', justifyContent:'center'}}>
          <Text style={[styles.purple, styles.header]}>Ваш аккаунт</Text>
        </View>
        <View style={{padding: 30, }}>
          <Text style={{fontSize: 25}}>id аккаунта: <Text style={styles.purple}>{this.props.user.getInfo().id}</Text></Text>
          <Text style={{fontSize: 25}}>Имя: <Text style={styles.purple}>{this.props.user.getInfo().name}</Text></Text>
          <Text style={{fontSize: 25}}>Почта: <Text style={styles.purple}>{this.props.user.getInfo().email}</Text></Text>
          <Text style={{fontSize: 25}}>Телефон: <Text style={styles.purple}>{this.props.user.getInfo().phone}</Text></Text>
          <Text style={{fontSize: 25}}>Тип пользователя: <Text style={styles.purple}>{this.props.user.getInfo().type == 'seller'? 'продавец' : 'покупатель' }</Text></Text>
        </View>
      </View>
    );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IAccountScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(AccountScreen)