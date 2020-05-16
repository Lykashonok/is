import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, ActivityIndicator, StatusBar, Modal } from 'react-native';
import { TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';
import PlainButton from '../../Components/PlainButton';
import PhoneInput from 'react-native-phone-input'
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { MaterialIndicator } from 'react-native-indicators';

class ConfirmPhoneScreen extends Component{
    state = {
        code: '',
        isLoading: false
    }

    login = async () => {
        //phone
        this.setState({isLoading: true});
        console.log(this.state.code)
        this.props.navigation.state.params.confirm(this.state.code)
        //phone confirmation
        //confirmation.confirm(code)
        //check google Auth in Login Screen
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'space-evenly'}} style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={{flex: 2, paddingTop: '30%', paddingBottom: '30%'}}>
                        <Text style={{fontSize: 60}}>ToDo</Text>
                    </View>
                    {/* <LineInputForm
                        onChangeTextHandler= {(phone) => {
                            this.setState({phone: phone})
                        }}
                        placeholder="enter your phone number"/> */}
                    <View style={{width: '100%',alignItems: 'center'}}>
                        <PhoneInput
                            ref={(ref) => { this.phone = ref; }}
                            flagStyle={{display: 'none'}}
                            data = {this.state.code}
                            onChangePhoneNumber={(number) => {
                                this.setState({code : number})
                            }}
                            textProps={{placeholder: 'enter confirmation code', style: { textAlign: 'center',fontSize: 18}}}
                            style={{
                                width: '70%'
                            }}
                            initialCountry='by'
                        />
                    </View>
                    <View style={{borderBottomColor: 'black', width: '70%', borderBottomWidth: 1}}/>
                    {
                        true ? 
                        <View style={{paddingTop: 25}}>
                            <PlainButton
                                text="Validate" 
                                onPressHandler={ () => {
                                    this.login()
                                    //this.props.navigation.navigate('Slides')
                                }}
                                width = {200}
                            />
                        </View> : <></>
                    }
                </ScrollView>
                <Modal animationType="fade" visible={this.state.isLoading} transparent={true}>
                    <View style={{backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <MaterialIndicator color='white' />
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}


export default connect(state => ({user: state.user}))(ConfirmPhoneScreen)