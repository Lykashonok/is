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
import AirButton from '../../Components/AirButton';
import LineInputForm from '../../Components/LineInputForm'

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
  name: string,
  price: number,
  description: string,
  stars: number
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

      name: '',
      price: 0,
      description: '',
      stars: 0
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
      <View style={[styles.container, {marginHorizontal: 20}]}>
        {
            this.state.editState == 'edit' ? <></> :
            <View>
                <AirButton width={100} opacity={this.state.itemState == 'composite' ? 0.3 : 1} text='Обычный' onPressHandler={async () => {
                  this.setState({itemState: 'item'})
                }}/>
                <AirButton width={100} opacity={this.state.itemState == 'composite' ? 1 : 0.3} text='Составной' onPressHandler={async () => {
                  this.setState({itemState: 'composite'})
                }}/>
            </View>

        }
        {
          this.state.isLoading ? <ActivityIndicator/> :
          <View style={{
            backgroundColor: 'white',
            width: '100%', marginVertical: 5, padding: 20,
            borderWidth: 3, borderColor: 'purple', borderRadius: 15,
            
          }}
          >
            <Text>id товара: {this.state.item?.id}</Text>
            <Text>id продавца: {this.state.item?.seller_id}</Text>
            <Text>Название товара: </Text>
            <LineInputForm password={false} onChangeTextHandler={(text) => this.setState({name: text})} value={this.state.name ? this.state.name : this.state.item?.name}/>
            <Text>Цена товара: </Text> 
            <LineInputForm password={false} onChangeTextHandler={(text) => this.setState({price: Number(text)})} value={this.state.price ? this.state.name : String(this.state.item?.price)}/>
            <Text>Звёзды товара: </Text> 
            <LineInputForm password={false} onChangeTextHandler={(text) => this.setState({stars: Number(text)})} value={this.state.stars ? this.state.name : String(this.state.item?.stars)}/>
            <Text>Описание товара: </Text> 
            <LineInputForm password={false} onChangeTextHandler={(text) => this.setState({description: text})} value={this.state.name ? this.state.name : this.state.item?.description}/>
            <Text>Поступило на продажу с: { new Date(Number(this.state.item?.created_date)).toLocaleDateString()}</Text>
          </View>
        }
        {
          this.state.itemState == "item" ?
          <AirButton
            onPressHandler={async () => {
                if (this.state.item)
                    switch(this.state.editState) {
                        case 'edit' :
                            return await (this.props.user as Seller).editItem(this.state.item, (isLoading) => this.setState({isLoading}))
                        case 'create' :
                            return await (this.props.user as Seller).createItem(new Item(0, 'New Cool item', 'qwerqwer', 4, 123, Number(this.props.user.getId()), 'Park', 123, ''), (isLoading) => this.setState({isLoading}))
                    }
            }}
            text={this.state.editState == 'edit' ? 'Изменить' : 'Создать'}
            width={100}
          /> : 
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
              <AirButton width={100} text='Добавить' onPressHandler={async () => {
                let tmp = this.state.pickers
                tmp.length < 10 ? tmp.push({index: tmp.length, id: this.props.navigation.state.params!.items[0].id}) : null
                this.setState({pickers: tmp})
                this.forceUpdate()
              }}/>
              <AirButton width={100} text='Создать' onPressHandler={async () => {
                return await (this.props.user as Seller).createCompositeItem(this.state.item!, this.state.pickers, this.state.items, (isLoading: boolean) => this.setState({isLoading}))
              }}/>
              <AirButton width={100} text='Убрать' onPressHandler={async () => {
                this.state.pickers.length > 1 ? this.state.pickers.pop() : null
                this.forceUpdate()
              }}/>
            </View>
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