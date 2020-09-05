import styles from '../Styles/main';
import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { navigationProps } from '../Interfaces/shortcuts';

interface LineInputFormProps {
    navigation?: navigationProps,
    password: boolean,
    phone?: boolean,
    placeholder?: string,
    onChangeTextHandler: (text : string) => void,
    value?: string
}

interface LineInputFormState {

}
//props: onChangeTextHandler,  placeholder, 
class LineInputForm extends Component<LineInputFormProps, LineInputFormState> {
  
  render() {
    return (
        <View style={{height: 45,alignItems: 'center'}}>
            <TextInput
                secureTextEntry={ this.props.password ? true : false}
                keyboardType={this.props.phone ? 'phone-pad' : 'default'}
                style={{height: 50,paddingLeft: 20, width: 200}}
                placeholder={this.props.placeholder}
                onChangeText={(text) => {
                    this.setState({text})
                    this.props.onChangeTextHandler!(text)
                }}
                value = {this.props.value}
            />
            <View style={{
                position: 'absolute',
                bottom:0,
                height: 1.5,
                width: 240,
                backgroundColor: 'purple',
            }}></View>
        </View>
    );
  }
}

export default LineInputForm