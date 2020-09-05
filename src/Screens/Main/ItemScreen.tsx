import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getItemInfo, registrateChat, registrateOrder } from '../../Networking/ServerRequest';
import AirButton from '../../Components/AirButton';
import { AlertManager } from '../../Classes/AlertManager';

interface IItemScreenProps {
  navigation: navigationProps;
}

type Props = IItemScreenProps & ILinkStateProps

interface IItemScreenState {
  search: string,
  item: Item | null,
  isLoading: boolean
}

class ItemScreen extends Component<Props, IItemScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      item: null,
      isLoading: false
    };
  }

  public async getItemInfo(id: number, activityIndicator?: (value: boolean) => void): Promise<Item> {
    let item: Item = new Item();
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

  public async createOrGoToChat(id: number, activityIndicator?: (value: boolean) => void): Promise<number> {
    let chatId: number = 0;
    try {
      if (activityIndicator) activityIndicator(true);
      let response = await registrateChat(id, this.props.user.getId());
      if (response.code != 200) throw "createOrGoToChat order failed";
      if (response.chat) {
        chatId = response.chat.id
      } else {
        chatId = response.id!
      }
    } catch {
    } finally {
      if (activityIndicator) activityIndicator(false);
      return chatId;
    }
  }

  public async registrateOrder(item: Item, activityIndicator?: (value: boolean) => void): Promise<void> {
    try {
      if (activityIndicator) activityIndicator(true);
      let response = await registrateOrder(-1, Number(this.props.navigation.state.params!.id), Number(this.props.user.getId()), Number(item.seller_id), 0, 'confirmed');
      if (response.code != 200) throw "changeOrderStateById order failed";
      AlertManager.alertHandler.alertWithType('success', 'Заказ успешно совершён', 'перейдите в ваши заказы или в сообщения к продавцу')
    } catch {
      AlertManager.alertHandler.alertWithType('error', 'Заказ не удался', 'попробуйте ещё раз или выберите другой заказ')
    } finally {
      if (activityIndicator) activityIndicator(false);
    }
  }

  async componentDidMount() {
    this.setState({ item: await this.getItemInfo(this.props.navigation.state.params!.id, (isLoading) => this.setState({ isLoading })) })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <View style={{
          backgroundColor: 'white',
          width: '100%', marginVertical: 5, padding: 20,
          borderWidth: 3, borderColor: 'purple', borderRadius: 15,
          alignItems: 'center'
        }}>
          {
            this.state.isLoading ? <ActivityIndicator/> :
            <View>
              <Text>id товара: {this.props.navigation.state.params!.id}</Text>
              <Text>id продавца{this.state.item?.seller_id}</Text>
              <Text>Название товара: {this.state.item?.name}</Text>
              <Text>Цена товара: {this.state.item?.price}</Text>
              <Text>Звёзд: {this.state.item?.stars}/5</Text>
              <Text>Описание: {this.state.item?.description}</Text>
              <Text>Поступило на продажу с: { new Date(Number(this.state.item?.created_date)).toLocaleDateString()}</Text>
            </View>
          }
          <View style={{ paddingVertical: 20 }}>
            <AirButton onPressHandler={async () => {
              this.props.navigation.navigate("Chat", { id: await this.createOrGoToChat(this.state.item!.seller_id, (isLoading) => this.setState({ isLoading })) })
            }} width={200} text="Перейти в сообщения" />
            <AirButton onPressHandler={async () => {
              await this.registrateOrder(this.state.item!, (isLoading) => this.setState({ isLoading }))
            }} width={200} text="Заказать" />
          </View>
        </View>
      </View>
    );
  }
}


interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IItemScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ItemScreen)