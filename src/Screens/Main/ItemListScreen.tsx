import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { findRequest } from '../..//Networking/ServerRequest';
import { Icon } from 'react-native-elements'

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
        // new Item(2.123,'Noga',"5",123,123,123,"123"),
        // new Item(2.123,'Telephone',"5",123,123,123,'123'),
        // new Item(2.123,'Jepandopala',"5",123,123,123,'123'),
        // new Item(2.123,'Hoolahoopa',"5",123,123,123,'123'),
        // new Item(2.123,'Fridge',"5",123,123,123,'123'),
        // new Item(2.123,'oranjereya',"5",123,123,123,'123'),
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
          
          searchIcon={<Icon name={'search'} color={'purple'}/>}
          clearIcon={<Icon name={'cross'} type={'entypo'} color={'purple'}/>}
          inputStyle={{color:"purple"}}
          placeholderTextColor={'purple'}
          lightTheme={true}
          value={search}
          containerStyle={styles.search_bar}
        />
        {
          this.state.items.length == 0 ? <Text style={[styles.header, styles.purple, {alignSelf: 'center'}]}>Ничего не найдено</Text> :
          <FlatList
            onRefresh={() => this.search(null)}
            refreshing={this.state.isLoading}
            contentContainerStyle={{padding: 10}}
            style={{flex: 1, width: '100%'}}
            keyExtractor={item => this.state.items.indexOf(item).toString()}
            data={this.state.items}
            renderItem={item => {
              
              return (
                <TouchableOpacity 
                    style={{
                      backgroundColor: 'white',
                      width: '100%', marginVertical: 5, padding: 20,
                      borderWidth: 3, borderColor: 'purple', borderRadius: 15,
                      shadowOpacity: 0.75, shadowRadius: 15,elevation: 7,
                      shadowColor: 'purple', shadowOffset: { height: 30, width: 30 }, 
                    }}
                    onPress={ () => {
                      this.props.navigation.navigate('Item', {id: item.item.id})
                    }}
                  >
                    <View>
                      <View>
                        <Text>id продавца: {item.item.getId()}</Text>
                        <Text>id товара: {item.item.getId()}</Text>
                        <Text>Название: <Text style={styles.purple}>{item.item.description}</Text></Text>
                        <Text>Цена: <Text style={styles.purple}>{item.item.price}$</Text></Text>
                        <Text>Поступило в продажу с: {new Date(Number(item.item.created_date)).toLocaleDateString()}</Text>
                        <Text>Всего звёзд: <Text style={styles.purple}>{item.item.stars}</Text></Text>
                      </View>
                      <Image style={{borderWidth: 1}} source={{uri: `data:image/gif;base64,${item.item.image}`}} />
                    </View>
                    
                    {
                      item.item.items == '' ? <></> : 
                      
                      <View>
                        <Text>В состав входит:</Text>
                        {this.state.compositeInnerItems[this.state.items.indexOf(item.item)].map(item => {
                          console.log(item)
                          return (
                            <TouchableOpacity
                              onPress={ () => {
                                this.props.navigation.navigate('Item', {id: item.id})
                              }}
                              style={{
                                backgroundColor: 'white',
                                width: '100%', marginVertical: 5, padding: 20,
                                borderWidth: 3, borderColor: 'purple', borderRadius: 15,
                              }}
                            >
                              <View>
                                <Text>{item.image}</Text>
                                <View>
                                  <Text>id продавца: {item.seller_id}</Text>
                                  <Text>id товара: {item.id}</Text>
                                  <Text>Название: <Text style={styles.purple}>{item.description}</Text></Text>
                                  <Text>Цена: <Text style={styles.purple}>{item.price}$</Text></Text>
                                  <Text>Поступило в продажу с: {new Date(Number(item.created_date)).toLocaleDateString()}</Text>
                                  <Text>Всего звёзд: <Text style={styles.purple}>{item.stars}</Text></Text>
                                </View>
                                <Image source={{uri: `data:image/gif;base64,${item.image}`}} />
                              </View>
                            </TouchableOpacity>
                            )
                          }
                        )}
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

const mapStateToProps = (state: AppState, ownProps: IItemListScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ItemListScreen)