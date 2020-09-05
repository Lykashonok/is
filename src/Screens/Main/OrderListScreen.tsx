import styles from '../../Styles/main';
import React, { Component, version } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { Order, Caretaker } from '../../Classes/Order'
import { getRequest, registrateOrder, deleteRequest } from '../../Networking/ServerRequest'
import { CommonUser } from '../../Classes/User'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { AlertManager } from '../../Classes/AlertManager';
import { SlideFromRightIOS } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets';
import AirButton from '../../Components/AirButton';

interface IOrderListScreenProps {
    navigation: navigationProps;
}

type Props = IOrderListScreenProps & ILinkStateProps

interface IOrderListScreenState {
  isLoading: boolean,
  orders: Order[],
  searchFieldType: string,
  caretaker: Caretaker,
  canRestore: boolean
}

class OrderListScreen extends Component<Props, IOrderListScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      orders: [],
      searchFieldType: this.props.user.getInfo().type == 'customer' ? 'user_id' : 'seller_id',
      caretaker: new Caretaker(new Order()),
      canRestore: false
    }
  }
  public async getRequest(id: number, field: string, activityIndicator? : (value : boolean) => void ) : Promise<Order[]>{
    let orders : Order[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getRequest('orders', field, Number(id));
        if (response.code != 200) throw "getRequest order failed";
        response.getResult!.forEach((order : any) => {
          let currentOrder = new Order(order.id, order.item_id, order.user_id, order.seller_id, order.created_date, order.finishid_date, order.state);
          orders.push(currentOrder)
        });
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return orders;
    }
  }
  async componentDidMount() {
    this.setState({orders: await this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading}))});
  }
  
  async reregistrateOrder(orderToRestore: Order, activityIndicator? : (value : boolean) => void) {
    try {
        if (activityIndicator) activityIndicator(true);
        
        console.log('restore to ', orderToRestore)
        let response = await registrateOrder(orderToRestore.id, orderToRestore.item_id, orderToRestore.user_id, orderToRestore.seller_id, orderToRestore.created_date, orderToRestore.state);
        this.setState({orders: await this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading})), canRestore: true});
        if (response.code != 200) throw "getRequest order failed"
        AlertManager.alertHandler.alertWithType('success', 'Предмет восстановлен', '')
    } catch {
        AlertManager.alertHandler.alertWithType('error', 'Предмет не восстановлен', '')
    } finally {     
        if (activityIndicator) activityIndicator(false);
    }
  }

  async deleteOrder(id: number, activityIndicator? : (value : boolean) => void) {
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await deleteRequest('orders','id',Number(id));
        this.setState({orders: await this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading})), canRestore: true});
        if (response.code != 200) throw "getRequest order failed"
        
        AlertManager.alertHandler.alertWithType('warn', 'Предмет удалён!', 'Но вы можете ещё восстановить')

    } catch {
        AlertManager.alertHandler.alertWithType('error', 'Предмет не удалён', '')
    } finally {
        
        if (activityIndicator) activityIndicator(false);
    }
  }

  render() {
    return (
      <View style={{}}>
        <View style={{height: 67, borderBottomWidth: 2, width: '100%', borderBottomColor: 'purple', alignItems: 'center', justifyContent:'center'}}>
          <Text style={[styles.purple, styles.header]}>Ваши заказы</Text>
        </View>
        {
          !this.state.canRestore ? <></> :
          <View style={{alignSelf: 'center', paddingTop: 10}}>
            <AirButton onPressHandler={ async ()=>{
                console.log(this.state.caretaker)
                await this.reregistrateOrder(this.state.caretaker.undo() as Order, (isLoading) => this.setState({isLoading}))
                this.setState({canRestore: false})
              }}
              width={200}
              text={'Восстановить'}
            />
          </View>
        }
        {
          this.props.user.getInfo().type == 'customer' ? 
          <FlatList
            data={this.state.orders}
            contentContainerStyle={{padding: 20}}
            keyExtractor={order => this.state.orders.indexOf(order).toString()}
            refreshing={this.state.isLoading}
            onRefresh={async () => this.setState({orders: await this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading}))})}
            renderItem={order => (
              <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '100%', marginVertical: 5, padding: 20,
                borderWidth: 3, borderColor: 'purple', borderRadius: 15,
              }}
              onPress={ () => {
                this.props.navigation.navigate('Order', {id: order.item.id})
              }}
            >
              <Text>id заказа:{order.item.id}</Text>
              <Text>id товара:{order.item.item_id}</Text>
              <Text>id продавца:{order.item.seller_id}</Text>
              <Text>id заказчика:{order.item.user_id}</Text>
              <Text>Состояние:{order.item.state}</Text>
              {/* <Text>{order.item.finished_date}</Text> */}
              <Text>Дата заказа:{order.item.created_date}</Text>
            </TouchableOpacity>
          )}/> : 
          <FlatList
            contentContainerStyle={{width: '100%', padding: 20}}
            data={this.state.orders}
            keyExtractor={order => this.state.orders.indexOf(order).toString()}
            refreshing={this.state.isLoading}
            onRefresh={async () => this.setState({orders: await this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading}))})}
            renderItem={order => (
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    width: '100%', marginVertical: 5, padding: 20,
                    borderWidth: 3, borderColor: 'purple', borderRadius: 15,
                  }}
                  onPress={ () => {
                    this.props.navigation.navigate('Order', {id: order.item.id})
                  }}
                >
                  
                  <Text>id заказа:{order.item.id}</Text>
                  <Text>id товара:{order.item.item_id}</Text>
                  <Text>id продавца:{order.item.seller_id}</Text>
                  <Text>id заказчика:{order.item.user_id}</Text>
                  <Text>Состояние:{order.item.state}</Text>
                  {/* <Text>{order.item.finished_date}</Text> */}
                  <Text>Дата заказа:{order.item.created_date}</Text>
                  <TouchableOpacity
                    style={{backgroundColor: 'rgba(230,0,0,0.4)', width: 'auto', alignSelf: 'flex-end', borderRadius: 10, padding: 5}}
                    onPress={async () => {
                      this.state.caretaker.registrateOriginator(
                        new Order(
                        order.item.id,
                        order.item.item_id,
                        order.item.user_id,
                        order.item.seller_id,
                        order.item.created_date,
                        order.item.finished_date,
                        order.item.state,
                        new Order(
                          order.item.id,
                          order.item.item_id,
                          order.item.user_id,
                          order.item.seller_id,
                          order.item.created_date,
                          order.item.finished_date,
                          order.item.state)
                      ))
                      this.state.caretaker.backup()
                      await this.deleteOrder(order.item.getId())
                    }}
                  >
                    <Text>
                      Удалить
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
          )}/>
        }
      </View>
    );
  }
}


interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IOrderListScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(OrderListScreen)