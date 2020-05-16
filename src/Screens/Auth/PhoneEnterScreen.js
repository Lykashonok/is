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

let DATA = [
    {
        type: 'deleted',
        title: 'qwerytrwegffd',
        important: true,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
    {
        type: 'deleted',
        title: 'wafnbvrwgxncnrxmn ',
        important: true,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
    {
        type: 'finished',
        title: 'Taevsertvservs',
        important: true,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
    {
        type: 'finished',
        title: 'eeeeeeeeeeeeeeeeeeee',
        important: false,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
    {
        type: 'current',
        title: 'rrrrrrrrrrrrrrrrrr',
        important: false,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
    {
        type: 'current',
        title: 'wwwwwwwwwwwwwwwwwwwww',
        important: false,
        description: 'qwerqwerqwer',
        date: 'Thu Mar 05 2020'
    },
];

class PhoneEnterScreen extends Component{
    state = {
        phone: '',
        user: {
            token: '',
            id: '',
            phone: '',
            tasks: []
        },
        isLoading: false,
        confirmation: null
    }

    confirm = (code) => {
        this.state.confirmation.confirm(code)
        .then(result => {
            if(result.phoneNumber == this.state.phone){
                this.props.navigation.navigate('Main')
            }
        }).catch((err) => console.log(err))
    }

    login = async () => {
        //phone
        this.setState({isLoading: true});
        auth().signInWithPhoneNumber(this.state.phone)
        .then(confirmation => {
            console.log(confirmation.confirm)
            this.setState({isLoading: false, confirmation: confirmation});
            
            this.props.navigation.navigate('ConfirmPhone', {
                confirm: this.confirm
            })
        })
        .catch((err) => {
            //console.log(err)
            this.setState({isLoading: false})
        });
        

        //console.log(confirmation.confirm)
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
                            data = {this.state.phone}
                            onChangePhoneNumber={(number) => {
                                this.setState({phone : number})
                            }}
                            textProps={{placeholder: 'enter your phone number', style: { textAlign: 'center',fontSize: 18}}}
                            style={{
                                width: '70%'
                            }}
                            data = {this.state.phone}
                            initialCountry='by'
                        />
                    </View>
                    <View style={{borderBottomColor: 'black', width: '70%', borderBottomWidth: 1}}/>
                    {
                        true ? 
                        <View style={{paddingTop: 25}}>
                            <PlainButton
                                text="Send code" 
                                onPressHandler={ () => {
                                    this.props.user.tasks = DATA
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


export default connect(state => ({user: state.user}))(PhoneEnterScreen)