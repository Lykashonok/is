import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { getMessagesById, getChatsById, ResultType } from '../../Networking/ServerRequest';
import { Message, Chat } from '../../Classes/Message'
import { CommonUser } from '../../Classes/User'
import { AlertManager } from '../../Classes/AlertManager'
import { navigationProps } from 'src/Interfaces/shortcuts';

interface IChatListScreenProps {
    navigation: navigationProps;
}

type Props = IChatListScreenProps & ILinkStateProps

interface IChatListScreenState {
  isLoading: boolean,
  chats: Chat[]
}

class ChatListScreen extends Component<Props, IChatListScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {isLoading: false, chats: []}
  } 

  public async getChatsById(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Chat[]>{
    let chats : Chat[] = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getChatsById(id);
        if (response.code != 200) throw "Register failed";
        response.chats!.map(chat => chats.push({id: Number(chat.id), created: Number(chat.created), user1: Number(chat.user1), user2: Number(chat.user2), key: Number(chat.created)}))
        this.setState({chats})
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return chats;
    }
  }

  async componentDidMount() {
    this.setState({chats: await this.getChatsById(this.props.user.getId(), (isLoading) => this.setState({ isLoading }))})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {
          <View style={{height: 67, borderBottomWidth: 2, width: '100%', borderBottomColor: 'purple', alignItems: 'center', justifyContent:'center'}}>
            <Text style={[styles.purple, styles.header]}>Ваши сообщения</Text>
            {this.state.isLoading ? <ActivityIndicator/>: <></>}
          </View>
          
        }
        {
          this.state.chats.length == 0 && !this.state.isLoading ? <Text style={[styles.purple, styles.header, {alignSelf: 'center'}]}>Пока диалогов нет</Text>:
          <FlatList
            data={this.state.chats}
            style={{paddingVertical: 25}}
            keyExtractor={chat => this.state.chats.indexOf(chat).toString()}
            refreshing={this.state.isLoading}
            onRefresh={async () => this.setState({chats: await this.getChatsById(this.props.user.getId(), (isLoading) => this.setState({ isLoading }))})}
            renderItem={chat => (
              <TouchableOpacity 
                style={{
                  backgroundColor: 'white',
                  width: '100%', marginVertical: 5, padding: 20,
                  borderWidth: 3, borderColor: 'purple', borderRadius: 15,
                }}
                onPress={() => navigate("Chat", { id: chat.item.id})}>
                <Text>
                  id Диалога - {chat.item.id}
                </Text>
                <Text>
                  id Пользователя - {chat.item.user2}
                </Text>
                <Text>
                  Дата создания - {(new Date(chat.item.created)).toLocaleString()}
                </Text>
              </TouchableOpacity>
              )
            }
          />
          
        }
      </View>
    );
  }
}
interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IChatListScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ChatListScreen)