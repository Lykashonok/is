import React, { Component } from 'react';
import { SafeAreaView, Text, View, Image, KeyboardAvoidingView, Modal, ActivityIndicator, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import * as Actions from '../../Redux/Actions/UserAction';
import { connect } from 'react-redux';
import PlainButton from '../../Components/PlainButton';
import { retrieveData, USER_TASKS, retrieveDataArray, storeDataArray } from '../../Assets/AsyncStorageManager';
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

class LoginScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            login: 'qwe', 
            password: '',
            isLoading: false,

            user: {
                token: '',
                id: '',
                phone: '',
                tasks: []
            }
        };

        if(this.props.screenProps.showSlides){
            this.props.screenProps.setShowSlides(false);
            this.props.navigation.navigate('Slides')
        }

        if(this.props.screenProps.verified){
            this.props.navigation.navigate('Main');
        }
    }

    anonymousLogin = async () => {
        this.props.navigation.navigate('Main');

        auth()
        .signInAnonymously()
        .then( async () => {
          console.log('User signed in anonymously');
          /*let data = await retrieveDataArray(USER_TASKS);
          this.setState({isLoading: false});
          this.props.user.tasks = data ? data : [];*/
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
      
          console.error(error);
        });
    }

    onGoogleButtonPress = async () => {
        // Get the users ID token
        this.setState({isLoading: true})
        const { idToken } = await GoogleSignin.signIn();
        console.log(idToken);
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }

    render(){
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <View style={{flex: 2}}/>
                <View style={{flex: 4}}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>Welcome to</Text>
                    <Text style={{fontSize: 60}}>ToDo</Text>
                </View>
                <View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
                    <PlainButton
                        text="Sing up with phone number" 
                        onPressHandler={ () => {
                            this.props.navigation.navigate('LoginEnter')
                        }}
                        width = {225}
                    />
                    <PlainButton 
                        text="Continue without account" 
                        onPressHandler={ async () => {
                            this.setState({isLoading: true})
                            this.anonymousLogin();
                        }}
                        width = {225}
                    />
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{borderBottomWidth: 1, flex: 4, marginBottom: 8}}/>
                        <Text style={{flex: 1, textAlign: 'center'}}>OR</Text>
                        <View style={{borderBottomWidth: 1, flex: 4, marginBottom: 8}}/>
                    </View>
                    <PlainButton
                        text="Sing up with Google"
                        image={require("../../Assets/images/14.png")}
                        onPressHandler={() => this.onGoogleButtonPress().then(() => this.props.navigation.navigate('Main'))}
                        width = {225}
                    />
                </View>
                <View style={{flex: 3}}></View>
                <Modal animationType="fade" visible={this.state.isLoading} transparent={true}>
                    <View style={{backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <MaterialIndicator color='white' />
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default connect(state => ({user: state.user}))(LoginScreen)