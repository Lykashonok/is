import styles from '../../Styles/main';
import React, { Component, version } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { Order } from '../../Classes/Order'
import { getRequest } from '../../Networking/ServerRequest'
import { CommonUser } from '../../Classes/User'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';

interface IOrderListScreenProps {
    navigation: navigationProps;
}

type Props = IOrderListScreenProps & ILinkStateProps

interface IOrderListScreenState {
  isLoading: boolean,
  orders: Order[],
}

class OrderListScreen extends Component<Props, IOrderListScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      orders: []
    }
  }
  public async getRequest(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Order[]>{
    let orders : Order[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getRequest('orders', 'user_id', Number(id));
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
    this.setState({orders: await this.getRequest(this.props.user.getId(), (isLoading) => this.setState({isLoading}))});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the OrderListScreen.</Text>
        {
          this.state.isLoading ? <ActivityIndicator/> :
          <FlatList
            data={this.state.orders}
            keyExtractor={order => this.state.orders.indexOf(order).toString()}
            renderItem={order => (
              <TouchableOpacity
              style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}
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
            )}
          />
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