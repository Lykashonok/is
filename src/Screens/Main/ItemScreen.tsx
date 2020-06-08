import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getItemInfo } from '../../Networking/ServerRequest';

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
    this.setState({item: await this.getItemInfo(this.props.navigation.state.params!.id, (isLoading) => this.setState({isLoading}))})
  }

  render() {
    return (
      <View style={styles.container}>
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