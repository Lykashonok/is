import styles from '../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { navigationProps } from '../Interfaces/shortcuts';

interface AirButtonProps {
    navigation?: navigationProps,
    onPressHandler: () => void,
    width: number,
    text: string,
    opacity?: number
}

interface AirButtonState {

}
//props: onChangeTextHandler,  placeholder, 
class AirButton extends Component<AirButtonProps, AirButtonState> {
  
  render() {
    return (
        <View style={{
            height: 55, width: this.props.width, borderRadius: 5, elevation: 4, 
            backgroundColor: '#ffffff', marginBottom: 10,
            shadowOpacity: 0.75, shadowRadius: 5,
            shadowColor: 'gray', shadowOffset: { height: 20, width: 20 }, 
        }}>
            <TouchableOpacity
                onPress={this.props.onPressHandler}
                style={{
                    flexDirection:'row',
                    width: '100%',
                    height: '100%', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text style={{fontFamily: 'Raleway', fontSize: 18, color: 'purple', opacity: this.props.opacity ? this.props.opacity : 1}}>{this.props.text}</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

export default AirButton