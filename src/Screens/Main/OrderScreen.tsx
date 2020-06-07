import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Order } from '../../Classes/Order'
import { getRequest } from '../../Networking/ServerRequest';

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
        console.log('poooo', order)
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return order;
    }
  }

  async componentDidMount() {
    this.setState({order: await this.getRequest(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            
        </TouchableOpacity> */}
        <Text>Order detail</Text>
        {
          this.state.order ? this.state.isLoading ? <ActivityIndicator/> :
          <View>
            <Text>{this.state.order!.id}</Text>
            <Text>{this.state.order!.created_date}</Text>
            <Text>{this.state.order!.finished_date}</Text>
            <Text>{this.state.order!.state}</Text>
            <Text>{this.state.order!.seller_id}</Text>
            <Text>{this.state.order!.user_id}</Text>
            <Text>{this.state.order!.seller_id}</Text>
            <Text>{this.state.order!.item_id}</Text>
          </View> : <></>
        }
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