import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

class AirButton extends Component{
    render(){
        return(
            <View style={{
                height: 55, width: this.props.width, borderRadius: 5, elevation: 4, 
                backgroundColor: '#ffffff', marginBottom: 10,
                shadowOpacity: 0.75, shadowRadius: 5,
                shadowColor: 'gray', shadowOffset: { height: 20, width: 20 }, 
            }}>
                <TouchableOpacity style={{height: '100%', width: '100%'}}
                    onPress={this.props.onPressHandler}
                    style={{
                        flexDirection:'row',
                        width: '100%',
                        height: '100%', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{fontFamily: 'Raleway', fontSize: 18}}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AirButton