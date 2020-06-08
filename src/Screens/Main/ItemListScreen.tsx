import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { findRequest } from '../..//Networking/ServerRequest';

interface IItemListScreenProps {
  navigation: navigationProps;
}

type Props = IItemListScreenProps & ILinkStateProps

interface IItemListScreenState {
  search: string,
  items: Item[],
  isLoading: boolean,
  searchTag: "name" | "description",
  compositeInnerItems: Item [][]
}

class ItemListScreen extends Component<Props, IItemListScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      items: [
        new Item(2.123,'Noga',"5",123,123,123,"123"),
        new Item(2.123,'Telephone',"5",123,123,123,'123'),
        new Item(2.123,'Jepandopala',"5",123,123,123,'123'),
        new Item(2.123,'Hoolahoopa',"5",123,123,123,'123'),
        new Item(2.123,'Fridge',"5",123,123,123,'123'),
        new Item(2.123,'oranjereya',"5",123,123,123,'123'),
      ],
      isLoading: false,
      searchTag: "name",
      compositeInnerItems: [] 
    };
  }

  public async findRequest(activityIndicator? : (value : boolean) => void ) : Promise<Item[]>{
    let items : Item[] = [];
    let compositeInnerItems : Item[] = [];
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await findRequest('items', this.state.searchTag, this.state.search);
        if (response.code != 200) throw "Register failed";
        response.findResult!.forEach((item : any) => {
          let currentItem = new Item(item.id, item.description, item.image, item.stars, item.created_date, item.seller_id, item.name, item.price, item.items);
          items.push(currentItem)
        });
        let compositeInnerItems : Item[][] = []
        for (const item of items) {
          let innerItems : Item[] = JSON.parse(item.items)
          compositeInnerItems.push(innerItems)
        }
        this.setState({compositeInnerItems})
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return items;
    }
  }

  async search(e: any) : Promise<void> {
    this.setState({items: await this.findRequest((isLoading) => this.setState({isLoading}))});
  }

  updateSearch(search: string) {
    this.setState({search})
  }

  render() {
    const { navigate } = this.props.navigation;
    const { search } = this.state
    return (
      <View style={styles.container_start}>
        <SearchBar
          placeholder={"Поиск..."}
          onEndEditing={async (e) => this.search(e)}
          onSubmitEditing={async (e) => this.search(e)}
          onChangeText={(search) => this.updateSearch(search)}
          lightTheme={true}
          value={search}
          containerStyle={styles.search_bar}
        />
        {
          this.state.items.length == 0 ? <Text>Ничего не найдено</Text> :
          <FlatList
            onRefresh={() => this.search(null)}
            refreshing={this.state.isLoading}
            contentContainerStyle={{padding: 20}}
            style={{flex: 1, width: '100%'}}
            keyExtractor={item => this.state.items.indexOf(item).toString()}
            data={this.state.items}
            renderItem={item => {

              return (
                <TouchableOpacity 
                    style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 5, padding: 20}}
                    onPress={ () => {
                      this.props.navigation.navigate('Item', {id: item.item.id})
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
                      this.state.compositeInnerItems[this.state.items.indexOf(item.item)].map(item => {
                        console.log(item)
                        return (
                          <TouchableOpacity
                            onPress={ () => {
                              this.props.navigation.navigate('Item', {id: item.id})
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
                        }
                      )
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

const mapStateToProps = (state: AppState, ownProps: IItemListScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ItemListScreen)