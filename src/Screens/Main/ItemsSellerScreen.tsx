import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getRequest } from '../../Networking/ServerRequest';

interface IItemsSellerScreenProps {
  navigation: navigationProps;
}

type Props = IItemsSellerScreenProps & ILinkStateProps

interface IItemsSellerScreenState {
  search: string,
  items: Item[],
  isLoading: boolean
}

class ItemsSellerScreen extends Component<Props, IItemsSellerScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      items: [],
      isLoading: false
    };
  }

  public async getRequest(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Item[]>{
    let items : Item[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getRequest('items', 'seller_id', Number(id));
        if (response.code != 200) throw "getRequest item failed";
        response.getResult!.forEach((item : any) => {
          let currentItem = new Item(item.id, item.description, item.image, item.stars, item.created_date, item.seller_id, item.name, item.price);
          items.push(currentItem)
        });
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return items;
    }
  }

  async componentDidMount() {
    this.setState({items: await this.getRequest(this.props.user.getId(),(isLoading) => this.setState({isLoading}))})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}
          onPress={ () => {
            this.props.navigation.navigate('EditItem')
          }}
        >
          <Text>
            CREATE ITEM
          </Text>
        </TouchableOpacity>
        {
          this.state.items.length == 0 ? <Text>Ничего не найдено</Text> :
          <FlatList
            contentContainerStyle={[styles.container]}
            style={{flex: 1, width: '100%'}}
            refreshing={this.state.isLoading}
            onRefresh={() => this.getRequest(this.props.user.getId(),(isLoading) => this.setState({isLoading}))}
            keyExtractor={item => this.state.items.indexOf(item).toString()}
            data={this.state.items}
            renderItem={item => (
              <TouchableOpacity 
                  style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}
                  onPress={ () => {
                    this.props.navigation.navigate('EditItem', {item: item.item})
                  }}
                >
                  <Text>{item.item.getId()}</Text>
                  <Text>{item.item.description}</Text>
                  <Text>{item.item.created_date}</Text>
                  <Text>{item.item.image}</Text>
                  <Text>{item.item.name}</Text>
                  <Text>{item.item.price}</Text>
                  <Text>{item.item.seller_id}</Text>
                  <Text>{item.item.stars}</Text>
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

const mapStateToProps = (state: AppState, ownProps: IItemsSellerScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ItemsSellerScreen)