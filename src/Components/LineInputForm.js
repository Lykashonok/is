import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


//props: onChangeTextHandler,  placeholder, 
class LineInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    render(){
        return(
            <View style={{height: 45,alignItems: 'center'}}>
                <TextInput
                    secureTextEntry={ this.props.password ? true : false}
                    keyboardType={this.props.phone ? 'phone-pad' : 'default'}
                    style={{height: 50,paddingLeft: 20, width: 200}}
                    placeholder={this.props.placeholder}
                    onChangeText={(text) => {
                        this.setState({text})
                        this.props.onChangeTextHandler(text)
                    }}
                    value = {this.props.value}
                />
                <View style={{
                    position: 'absolute',
                    bottom:0,
                    height: 1.5,
                    width: 240,
                    backgroundColor: 'black',
                }}></View>
            </View>
        )
    }
}

export default LineInputForm