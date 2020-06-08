import styles from '../../Styles/main';
import React, { Component, isValidElement } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser, Seller, Customer } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getItemInfo } from '../../Networking/ServerRequest';
import { Picker } from '@react-native-community/picker';

interface IEditItemScreenProps {
  navigation: navigationProps;
}

type Props = IEditItemScreenProps & ILinkStateProps

interface IEditItemScreenState {
  search: string,
  item: Item | null,
  isLoading: boolean,
  itemState: 'item' | 'composite',
  editState: 'edit' | 'create',
  lastSelected: string,
  items: Item[],
  pickers: {index: number, id: number}[],
}

class EditItemScreen extends Component<Props, IEditItemScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      item: null,
      isLoading: false,
      itemState: 'item',
      editState: 'create',
      lastSelected: '',
      pickers: [],
      items: [],
    };
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
    
    let item = this.props.navigation.state.params!.item
    if (!item) {
        this.setState({item: new Item(), editState: 'create', items: this.props.navigation.state.params!.items})
    } else {
        this.setState({item, editState: 'edit', items: this.props.navigation.state.params!.items})
        if (item.items && item.items != '') {
          this.setState({itemState: 'composite'})
        } else {
          this.setState({itemState: 'item'})
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.editState == 'edit' ? <></> :
            <View>
                <TouchableOpacity
                    onPress={()=> {this.setState({itemState: 'item'})}}
                    style={[this.state.itemState == 'item' ? {backgroundColor: 'rgba(0,0,0,0.3)'} : {backgroundColor: 'rgba(0,0,0,0.0)'},]}
                >
                    <Text>Обычный</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> {this.setState({itemState: 'composite'})}}
                    style={[this.state.itemState == 'item' ? {backgroundColor: 'rgba(0,0,0,0.0)'} : {backgroundColor: 'rgba(0,0,0,0.3)'},]}
                >
                    <Text>Составной</Text>
                </TouchableOpacity>
            </View>

        }
        {
          this.state.isLoading ? <ActivityIndicator/> :
          <View>
            <Text>{this.state.item?.id}</Text>
            <Text>{this.state.item?.image}</Text>
            <Text>{this.state.item?.name}</Text>
            <Text>{this.state.item?.price}</Text>
            <Text>{this.state.item?.seller_id}</Text>
            <Text>{this.state.item?.stars}</Text>
            <Text>{this.state.item?.description}</Text>
            <Text>{this.state.item?.created_date}</Text>
          </View>
        }
        {
          this.state.itemState == "item" ?
          <TouchableOpacity
            onPress={async () => {
                if (this.state.item)
                    switch(this.state.editState) {
                        case 'edit' :
                            return await (this.props.user as Seller).editItem(this.state.item, (isLoading) => this.setState({isLoading}))
                        case 'create' :
                            return await (this.props.user as Seller).createItem(new Item(0, 'New Cool item', 'qwerqwer', 4, 123, Number(this.props.user.getId()), 'Park', 123, ''), (isLoading) => this.setState({isLoading}))
                    }
            }}
          >
            {
                this.state.editState == 'edit' ? 
                <Text>EDIT THIS</Text> : <Text>CREATE NEW</Text>
            }
          </TouchableOpacity> : 
          <View>
            <TouchableOpacity onPress={() => {
              let tmp = this.state.pickers
              tmp.length < 10 ? tmp.push({index: tmp.length, id: this.props.navigation.state.params!.items[0].id}) : null
              this.setState({pickers: tmp})
              this.forceUpdate()
            }}>
              <Text>Увеличить количество предметов</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.state.pickers.length > 1 ? this.state.pickers.pop() : null
              this.forceUpdate()
            }}>
              <Text>Уменьшить количество предметов</Text>
            </TouchableOpacity>
            {
              this.state.pickers.map(picker => 
                <Picker
                  selectedValue={this.state.items.filter(item => item.id == picker.id)[0].id}
                  style={{height: 50, width: 250}}
                  onValueChange={(itemValue, itemIndex) => {
                    let tmp = this.state.pickers
                    tmp[picker.index].id = Number(itemValue)
                    this.setState({pickers: tmp})
                  }}>
                    {
                      this.state.items.filter(item => item.items == '').map(item => <Picker.Item label={item.name == '' ? 'Без имени' : item.name} value={item.id}/>)
                    }
                </Picker>
              )
            }
            <TouchableOpacity
              onPress={async () => {
                return await (this.props.user as Seller).createCompositeItem(this.state.item!, this.state.pickers, this.state.items, (isLoading: boolean) => this.setState({isLoading}))
              }}
            >
              {
                <Text>CREATE COMPOSITE</Text>
              }
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IEditItemScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(EditItemScreen)