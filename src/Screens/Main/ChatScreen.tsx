import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { GiftedChat } from 'react-native-gifted-chat'
import { getMessagesById } from '../../Networking/ServerRequest';
import { Message } from '../../Classes/Message'

interface IChatScreenProps {
  navigation: navigationProps;
}

interface IChatScreenState {
  messages: any[],
  previousState: any[],
  isLoading: boolean
}

class ChatScreen extends Component<IChatScreenProps, IChatScreenState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [], previousState: [], isLoading: false};
    this.onSend = this.onSend.bind(this);
  }

  public async getMessagesById(id: number, activityIndicator? : (value : boolean) => void ) : Promise<Message[]>{
    let chats : Chat[] = []
    console.log('start')
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getMessagesById(this.props.user.getId());
        if (response.code != 200) throw "Register failed";
        response.chats!.map(chat => chats.push({id: Number(chat.id), created: Number(chat.created), user1: Number(chat.user1), user2: Number(chat.user2)}))
        this.setState({chats})
        console.log(chats)
        console.log(this.state)
        // AlertManager.alertHandler.alertWithType('success', "Регистрация", "Пользователь успешно зарегистрирован")
    } catch {
        // AlertManager.alertHandler.alertWithType('error', "Регистрация", "Пользователь не зарегистрирован")
    } finally {
        if (activityIndicator) activityIndicator(false);
        console.log('end')
        return chats;
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  onSend(messages: any = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}



export default ChatScreen