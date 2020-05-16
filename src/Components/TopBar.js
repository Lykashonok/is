import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

class TopBar extends Component{
    render(){
        return(
            <SafeAreaView style={{elevation: 4, height: 60, width: '100%', backgroundColor: 'white'}}>
                <View style={{position: 'absolute', width: '100%'}}>
                    <Text style={{top: '50%', textAlign: 'center', fontSize: 20}}>{this.props.title}</Text>
                </View>
                {
                    this.props.backButtonHandler ?
                    <View style={{position: 'absolute', height: '100%', width: 45, left: 5}}>
                        <TouchableOpacity
                            onPressOut={() => {
                                this.props.backButtonHandler()
                            }}
                            style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{height:'100%', justifyContent: 'center'}}>
                                <Image style={{height: 27.5, width:15}} source={require("../Assets/images/23.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : <></>
                }
                {
                    this.props.menuButtonHandler ?
                    <View style={{position: 'absolute', right: 10, height: 30, width: 30, top: 15}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.menuButtonHandler()
                            }}
                            style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{height:'80%'}}>
                                <Image style={{height: 26, width: 8, resizeMode: 'contain'}} source={require("../Assets/images/31.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : <></>
                }
            </SafeAreaView>
        )
    }
}

export default TopBar