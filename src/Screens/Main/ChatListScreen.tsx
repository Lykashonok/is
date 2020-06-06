import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { getMessagesById, getChatsById, ResultType } from '../../Networking/ServerRequest';
import { Message, Chat } from '../../Classes/Message'
import { CommonUser } from '../../Classes/User'
import { AlertManager } from '../../Classes/AlertManager'

interface IChatListScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
        let response = await getChatsById(this.props.user.getId());
        if (response.code != 200) throw "Register failed";
        response.chats!.map(chat => chats.push({id: Number(chat.id), created: Number(chat.created), user1: Number(chat.user1), user2: Number(chat.user2), key: Number(chat.created)}))
        this.setState({chats})
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        console.log('end')
        return chats;
    }
  }

  async componentDidMount() {
    this.setState({chats: await this.getChatsById(this.props.user.getId(), (isLoading) => this.setState({ isLoading }))})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the ChatList.</Text>
        <Text>
          Chats
        </Text>
        {
          this.state.chats.map(chat => {
            let date = new Date(chat.created)
            return (
                <TouchableOpacity onPress={() => navigate("Chat", { id: chat.id})}>
                  <Text>
                    id of chat - {chat.id}
                  </Text>
                  <Text>
                    id of user 1 - {chat.user1}
                  </Text>
                  <Text>
                    id of user 2 - {chat.user2}
                  </Text>
                  <Text>
                    created Date - {date.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              )
            }
          )
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