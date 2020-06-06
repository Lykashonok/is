import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { FlatList } from 'react-native'
import { searchRequest } from '../..//Networking/ServerRequest';

interface IItemListScreenProps {
  navigation: navigationProps;
}

type Props = IItemListScreenProps & ILinkStateProps

interface IItemListScreenState {
  search: string,
  items: Item[],
  isLoading: boolean,
  searchTag: "name" | "description"
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
      searchTag: "name"
    };
  }

  public async findRequest(activityIndicator? : (value : boolean) => void ) : Promise<Item[]>{
    let items : Item[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await searchRequest('items', this.state.searchTag, this.state.search);
        if (response.code != 200) throw "Register failed";
        // let item = new Item(item.getId(), item.description, item.image, item.stars, item.created_date, item.seller_id, item.name, item.price;
        response.findResult!.forEach((item : any) => {
          let currentItem = new Item(item.id, item.description, item.image, item.stars, item.created_date, item.seller_id, item.name, item.price);
          items.push(currentItem)
        });
        // this.setState({items})
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return items;
    }
  }

  async search(e: any) : Promise<void> {
    console.log(e)
    this.setState({items: await this.findRequest((isLoading) => this.setState({isLoading}))});
  }

  updateSearch(search: string) {
    console.log(search)
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
        {this.state.isLoading ? <ActivityIndicator/> : <></>}
        {
          this.state.items.length == 0 ? <Text>Ничего не найдено</Text> :
          <ScrollView
            contentContainerStyle={styles.container}
            style={{flex: 1, width: '100%'}}
          >
            {
              this.state.items.map(item => 
                <TouchableOpacity 
                  style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}
                  onPress={ () => {
                    this.props.navigation.navigate('Item', {id: item.id})
                  }}
                >
                  <Text>{item.getId()}</Text>
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
          </ScrollView>
        }
        <TouchableOpacity onPress={() => navigate("Register")}>
            <Text>
                Item Screen
            </Text>
        </TouchableOpacity>

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