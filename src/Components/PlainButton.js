import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginScreen extends Component{
    render(){
        return(
            <TouchableOpacity
                disabled={this.props.disabled}
                onPress={this.props.onPressHandler}
                style={{
                    backgroundColor: "rgba(221, 221, 221, 0.35)",
                    borderRadius: 7,
                    opacity: this.props.disabled ? 0.4 : 1,
                    alignItems: 'center', justifyContent: 'center',
                    height: 36, flexDirection:'row',
                    width: this.props.width
                }}>
                {
                    this.props.image ?
                    <Image 
                        style={{marginRight: 15, height: 30, width: 30}}
                        source={this.props.image}/>:
                    <></>
                }
                <Text 
                    style={{fontFamily: 'Raleway', fontSize: 16}}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default LoginScreen