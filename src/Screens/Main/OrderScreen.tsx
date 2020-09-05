import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Order } from '../../Classes/Order'
import { getRequest, changeOrderStateById, registrateChat } from '../../Networking/ServerRequest';
import AirButton from '../../Components/AirButton';
import { AlertManager } from '../../Classes/AlertManager';

interface IOrderScreenProps {
  navigation: navigationProps;
}

type Props = IOrderScreenProps & ILinkStateProps

interface IOrderScreenState {
  search: string,
  order: Order | null,
  isLoading: boolean
}

class OrderScreen extends Component<Props, IOrderScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      order: null,
      isLoading: false
    };
  }

  public async getRequest(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Order>{
    let order : Order = new Order();
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getRequest('orders', 'id', Number(id));
        if (response.code != 200) throw "getRequest order failed";
        response = response.getResult![0]
        order = new Order(Number(response.id!), Number(response.item_id!), Number(response.user_id!), Number(response.seller_id!), Number(response.created_date!), Number(response.finished_date!), response.state!)
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return order;
    }
  }

  public async changeOrderStateById(id: number, state: string, activityIndicator? : (value : boolean) => void ) : Promise<void>{
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await changeOrderStateById(id, state);
        if (response.code != 200) throw "changeOrderStateById order failed";
        AlertManager.alertHandler.alertWithType('success','Состояния заказа изменилось!', '')
    } catch {
        AlertManager.alertHandler.alertWithType('error','Изменить заказ не получилось', 'Попробуйте ещё раз')
    } finally {
        if (activityIndicator) activityIndicator(false);
    }
  }

  public async createOrGoToChat(id: number, activityIndicator? : (value : boolean) => void ) : Promise<number>{
    let chatId: number = 0;
    try {
      if (activityIndicator) activityIndicator(true);
      let response = await registrateChat(id, this.props.user.getId());
      if (response.code != 200) throw "changeOrderStateById order failed";
      if (response.chat) {
        chatId = response.chat.id
      } else {
        chatId = response.id!
      }
    } catch {
    } finally {
      if (activityIndicator) activityIndicator(false);
      return chatId;
    }
  }

  async componentDidMount() {
    this.setState({order: await this.getRequest(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
        <View style={{height: 67, width: '100%', borderBottomColor: 'purple', alignItems: 'center', justifyContent:'center'}}>
        <Text style={[styles.purple, styles.header]}>Заказ</Text>
        </View>
        <View style={{
            backgroundColor: 'white',
            width: '100%', marginVertical: 5, padding: 20,
            borderWidth: 3, borderColor: 'purple', borderRadius: 15,
          }}>
          {
            this.state.order ? this.state.isLoading ? <ActivityIndicator/> :
            <View style={{alignSelf: 'center', margin: 20}}>
              <Text style={{fontSize: 20}}>id заказа: {this.state.order!.id}</Text>
              <Text style={{fontSize: 20}}>id продавца: {this.state.order!.seller_id}</Text>
              <Text style={{fontSize: 20}}>id пользователя: {this.state.order!.user_id}</Text>
              <Text style={{fontSize: 20}}>id товара: {this.state.order!.item_id}</Text>
              <Text style={{fontSize: 20}}>Состояние: {this.state.order!.state}</Text>
            </View> : <></>
          }

          {
            this.props.user.getInfo().type == "seller" ? 
            <View>
              <View style={{alignSelf: 'center'}}>
                <AirButton onPressHandler={async () => {
                  await this.changeOrderStateById(this.state.order!.id, 'confirmed', (isLoading) => this.setState({isLoading}))
                  this.setState({order: await this.getRequest(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
                }} width={200} text="Принято"/>
              </View>
              <View style={{alignSelf: 'center'}}><AirButton onPressHandler={async () => {
                  await this.changeOrderStateById(this.state.order!.id, 'sended', (isLoading) => this.setState({isLoading}))
                  this.setState({order: await this.getRequest(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
                }} width={200} text="Отправлено"/></View>
              <View style={{alignSelf: 'center'}}><AirButton onPressHandler={async () => {
                  await this.changeOrderStateById(this.state.order!.id, 'rejected', (isLoading) => this.setState({isLoading}))
                  this.setState({order: await this.getRequest(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
                }} width={200} text="Отказано"/></View>
            </View> : <></>
          }
          <View style={{alignSelf: 'center'}}><AirButton onPressHandler={async () => {
              this.props.navigation.navigate("Chat", { id: await this.createOrGoToChat(this.state.order!.user_id, (isLoading) => this.setState({isLoading}))})
            }} width={200} text="Перейти в сообщения"/></View>
        </View>
      </View>
    );
  }
}


interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IOrderScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(OrderScreen)