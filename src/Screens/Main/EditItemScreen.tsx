import styles from '../../Styles/main';
import React, { Component, isValidElement } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser, Seller, Customer } from '../../Classes/User'
import { Item } from '../../Classes/Item'
import { getItemInfo } from '../../Networking/ServerRequest';
import { UserManager } from '../../Classes/UserManager';

interface IEditItemScreenProps {
  navigation: navigationProps;
}

type Props = IEditItemScreenProps & ILinkStateProps

interface IEditItemScreenState {
  search: string,
  item: Item | null,
  isLoading: boolean,
  itemState: 'item' | 'composite',
  editState: 'edit' | 'create'
}

class EditItemScreen extends Component<Props, IEditItemScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      item: null,
      isLoading: false,
      itemState: 'item',
      editState: 'create'
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
    let param = this.props.navigation.state.params
    if (!param) {
        this.setState({item: new Item(), editState: 'create'})
    } else {
        this.setState({item: param.item, editState: 'edit'})
        if (param.item.items && param.item.items != '') {
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
                    onPress={()=> this.setState({itemState: 'composite'})}
                    style={
                        this.state.itemState == 'composite' ? {opacity: 0.4} : {}
                    }
                >
                    Обычный
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> this.setState({itemState: 'item'})}
                    style={
                        this.state.itemState == 'item' ? {opacity: 0.4} : {}
                    }
                >
                    Составной
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
        </TouchableOpacity>
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