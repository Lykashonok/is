import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth';

class SettingsScreen extends Component {
    state = {

    }

    exit = () => {
        auth().signOut()
        .then(() => {
            console.log('Logged Out!');
        })
        this.props.screenProps.signOut();
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <TouchableOpacity style={styles.floating} onPress={this.exit}>
                    <Image source={require('../../Assets/images/32.png')} style={styles.floatingImage}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%', 
        elevation: 4,
        backgroundColor: 'white',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 23
    },
    container: {
        flex: 1, 
        backgroundColor: 'white',
    },
    floating: {
        height: 65,
        width: 65,
        position: 'absolute',
        borderRadius: 40,
        backgroundColor: 'white',
        bottom: 20,
        right: 20,
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    floatingImage: {
        height: 40, 
        width: 40
    }
})

export default connect(state => ({}))(SettingsScreen)