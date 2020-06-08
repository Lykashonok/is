import styles from '../../Styles/main';
import React, { Component, version } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { Order, Caretaker } from '../../Classes/Order'
import { getRequest, registrateOrder } from '../../Networking/ServerRequest'
import { CommonUser } from '../../Classes/User'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { AlertManager } from '../../Classes/AlertManager';

interface IOrderListScreenProps {
    navigation: navigationProps;
}

type Props = IOrderListScreenProps & ILinkStateProps

interface IOrderListScreenState {
  isLoading: boolean,
  orders: Order[],
  searchFieldType: string,
  caretaker: Caretaker
}

class OrderListScreen extends Component<Props, IOrderListScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      orders: [],
      searchFieldType: this.props.user.getInfo().type == 'customer' ? 'user_id' : 'seller_id',
      caretaker: new Caretaker(new Order())
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
        let response = await registrateOrder(orderToRestore.id, orderToRestore.item_id, orderToRestore.user_id, orderToRestore.seller_id, orderToRestore.created_date, orderToRestore.state);
        if (response.code != 200) throw "getRequest order failed"
        AlertManager.alertHandler.alertWithType('success', 'Предмет восстановлен', '')
    } catch {
        AlertManager.alertHandler.alertWithType('error', 'Предмет не восстановлен', '')
    } finally {
        
        if (activityIndicator) activityIndicator(false);
    }
  }

  render() {
    return (
      <View style={{}}>
        <Text>This is the OrderListScreen.</Text>
        {
          this.props.user.getInfo().type == 'customer' ? 
          <FlatList
            data={this.state.orders}
            contentContainerStyle={{padding: 20}}
            keyExtractor={order => this.state.orders.indexOf(order).toString()}
            refreshing={this.state.isLoading}
            onRefresh={() => this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading}))}
            renderItem={order => (
              <TouchableOpacity
              style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 5, padding: 20}}
              onPress={ () => {
                this.props.navigation.navigate('Order', {id: order.item.id})
              }}
            >
              <Text>{order.item.id}</Text>
              <Text>{order.item.item_id}</Text>
              <Text>{order.item.seller_id}</Text>
              <Text>{order.item.state}</Text>
              <Text>{order.item.user_id}</Text>
              <Text>{order.item.finished_date}</Text>
              <Text>{order.item.created_date}</Text>
              <TouchableOpacity
                    style={{backgroundColor: 'red', width: 'auto', alignSelf: 'flex-end'}}
                    onPress={async () => {
                      this.setState({caretaker: new Caretaker(order.item)})
                      this.state.caretaker.backup()
                      AlertManager.alertHandler.closeAction = async () => {
                        await this.reregistrateOrder(this.state.caretaker.undo() as Order, (isLoading) => this.setState({isLoading}))
                      }
                      AlertManager.alertHandler.alertWithType('warn', 'Предмет удалён!', 'Нажмите, чтобы отменить')
                      
                      let editorder = new Order(0,0,0,0,0,0,'confirmed', new Order(0,0,0,0,0,0,'confirmed'));
                      let caretaker = new Caretaker(editorder);
                      console.log('we created order', order)
                      caretaker.backup();
                      editorder.item_id = 123
                      editorder.seller_id = 321
                      editorder.state = 'argar'
                      editorder.user_id = 321
                      console.log('changed values to', order)
                      caretaker.showHistory();
                      editorder = caretaker.undo() as Order
                      caretaker.showHistory();
                      console.log('after undoing is', order)
                    }}
                  >
                    <Text>
                      DELETE
                    </Text>
                  </TouchableOpacity>
            </TouchableOpacity>
          )}/> : 
          <FlatList
            contentContainerStyle={{width: '100%', padding: 20}}
            data={this.state.orders}
            keyExtractor={order => this.state.orders.indexOf(order).toString()}
            refreshing={this.state.isLoading}
            onRefresh={() => this.getRequest(this.props.user.getId(), this.state.searchFieldType, (isLoading) => this.setState({isLoading}))}
            renderItem={order => (
              <View>
                <TouchableOpacity
                  style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 5, padding: 20}}
                  onPress={ () => {
                    this.props.navigation.navigate('Order', {id: order.item.id})
                  }}
                >
                  <Text>{order.item.id}</Text>
                  <Text>{order.item.item_id}</Text>
                  <Text>{order.item.seller_id}</Text>
                  <Text>{order.item.state}</Text>
                  <Text>{order.item.user_id}</Text>
                  <Text>{order.item.finished_date}</Text>
                  <Text>{order.item.created_date}</Text>
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