import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getRequest, getItemInfo } from '../../Networking/ServerRequest';

interface IItemsSellerScreenProps {
  navigation: navigationProps;
}

type Props = IItemsSellerScreenProps & ILinkStateProps

interface IItemsSellerScreenState {
  search: string,
  items: Item[],
  isLoading: boolean
  currentInnerItems: Item[]
}

class ItemsSellerScreen extends Component<Props, IItemsSellerScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      items: [],
      isLoading: false,
      currentInnerItems: []
    };
  }

  public async getRequest(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Item[]>{
    let items : Item[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getRequest('items', 'seller_id', Number(id));
        if (response.code != 200) throw "getRequest item failed";
        response.getResult!.forEach((item : any) => {
          let currentItem = new Item(item.id, item.description, item.image, item.stars, item.created_date, item.seller_id, item.name, item.price, item.items);
          items.push(currentItem)
        });
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return items;
    }
  }

  public async getItemInfo(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Item>{
    let item : Item = new Item();
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getItemInfo(id);
        if (response.code != 200) throw "getItemInfo failed";
        item = response.item!
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return item;
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
            this.props.navigation.navigate('EditItem', {items: this.state.items})
          }}
        >
          <Text>
            CREATE ITEM
          </Text>
        </TouchableOpacity>
        {
          this.state.items.length == 0 ? <Text>Ничего не найдено</Text> :
          <FlatList
            contentContainerStyle={[{padding: 25}]}
            style={{flex: 1, width: '100%'}}
            refreshing={this.state.isLoading}
            onRefresh={async () => this.setState({items: await this.getRequest(this.props.user.getId(),(isLoading) => this.setState({isLoading}))})}
            keyExtractor={item => this.state.items.indexOf(item).toString()}
            data={this.state.items}
            renderItem={item => {
              console.info(item.item.items)
              return (
                <TouchableOpacity 
                    style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', padding: 25, marginVertical: 5}}
                    onPress={ () => {
                      this.props.navigation.navigate('EditItem', {item: item.item, items: this.state.items})
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
                    {
                      item.item.items == '' ? <></> :
                      <View>
                        <Text>Включает в себя:</Text>
                        {
                          (JSON.parse(item.item.items) as Item[]).map((raw) => {
                            let itemList = this.state.items.filter(item => item.id == raw.id)
                            if (itemList.length = 0) return <Text>Этот предмет удалён</Text>
                            let item = this.state.items.filter(item => item.id == raw.id)[0]
                            return (
                              <TouchableOpacity
                                onPress={ () => {
                                  this.props.navigation.navigate('EditItem', {items: this.state.items, item})
                                }}
                                style={{backgroundColor: 'rgba(255,130,10,0.5)', padding: 20, marginVertical: 5}}
                              >
                                <Text>{item.id}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.created_date}</Text>
                                <Text>{item.image}</Text>
                                <Text>{item.name}</Text>
                                <Text>{item.price}</Text>
                                <Text>{item.seller_id}</Text>
                                <Text>{item.stars}</Text>
                              </TouchableOpacity>
                            )
                          })
                        }
                      </View>
                    }
                  </TouchableOpacity>
              )
            }}
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