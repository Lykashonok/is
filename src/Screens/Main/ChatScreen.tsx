import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { navigationProps } from '../../Interfaces/shortcuts';
import { GiftedChat, Message, IMessage } from 'react-native-gifted-chat'
import { getMessagesById, sendMessage } from '../../Networking/ServerRequest';
import { MessageFromDB } from '../../Classes/Message'
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import { CommonUser } from '../../Classes/User'
import { AlertManager } from '../../Classes/AlertManager';

interface IChatScreenProps {
  navigation: navigationProps;
}

type Props = IChatScreenProps & ILinkStateProps

interface IChatScreenState {
  messages: IMessage[],
  previousState: any[],
  isLoading: boolean
}

class ChatScreen extends Component<Props, IChatScreenState> {
  constructor(props: any) {
    super(props);
    this.state = { messages: [], previousState: [], isLoading: false};
    this.onSend = this.onSend.bind(this);
  }

  public async getMessagesById(id: number, activityIndicator? : (value : boolean) => void ) : Promise<IMessage[]>{
    let messages: any = []
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await getMessagesById(this.props.navigation.state.params!.id);
        if (response.code != 200) throw "Getting messages failed";
        response.messages!.map( (message : MessageFromDB) => {
          messages.unshift(
            {
              _id: message.id,
              text: message.message,
              createdAt: new Date(Number(message.time)),
              user: {
                _id: message.sender,
                avatar: '',
                name: 'Human'
              }
            }
          )
        })
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        console.log('end')
        return messages;
    }
  }

  public async sendMessage(message : IMessage, activityIndicator? : (value : boolean) => void ) : Promise<IMessage>{
    let date = new Date()
    let newMessage = {
      _id: this.props.user.getId(),
      createdAt: date,
      text: message.text,
      user: {
        _id: this.props.user.getId()
      }
    }
    try {
        if (activityIndicator) activityIndicator(true);
        let response = await sendMessage(this.props.navigation.state.params!.id, this.props.user.getId(), date.getTime(), message.text)
        if (response.code != 200) throw "Getting messages failed";
        newMessage._id = response.id!
    } catch {
    } finally {
        if (activityIndicator) activityIndicator(false);
        return newMessage;
    }
  }

  async componentWillMount() {
    this.setState({messages: await this.getMessagesById(this.props.navigation.state.params!.id, (isLoading) => this.setState({ isLoading }))});
  }

  async onSend(messages: IMessage[] = []) {
    console.log('before', messages[0])
    messages[0] = await this.sendMessage(messages[0], (isLoading) => this.setState({ isLoading }))
    console.log('after', messages[0])
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
        messagesContainerStyle={{backgroundColor: 'white'}}
        isTyping={true}
        onPressAvatar={event => {
          console.log(event)
          AlertManager.alertHandler.alertWithType('info', 'Вы тыкнули по аве чела', 'дествительно тыкнули')
        }}
        user={{
          _id: this.props.user.getId(),
        }}
      />
    );
  }
}

interface ILinkStateProps {
  user: CommonUser
}

const mapStateToProps = (state: AppState, ownProps: IChatScreenProps): ILinkStateProps => ({
  user: state.user
})

export default connect(
  mapStateToProps,
)(ChatScreen)