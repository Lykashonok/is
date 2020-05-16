import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import CurrentTasksScreen from '../Screens/Main/CurrentTasksScreen'
import FinishedTasksScreen from '../Screens/Main/FinishedTasksScreen'
import DeletedTasksScreen from '../Screens/Main/DeletedTasksScreen'
import SettingsScreen from '../Screens/Main/SettingsScreen'
import React from 'react'
import {Image} from 'react-native'

export default createMaterialTopTabNavigator ({
    CurrentTasks: {
        screen: CurrentTasksScreen,
        navigationOptions: {
            title: 'Bruh',
            tabBarIcon: (props) => {
                if(props.focused){
                    return <Image source={require('../Assets/images/16.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }else{
                    return <Image source={require('../Assets/images/15.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }
            }   
        }
    },
    FinishedTasks: {
        screen: FinishedTasksScreen,
        navigationOptions: {
            tabBarIcon: (props) => {
                if(props.focused){
                    return <Image source={require('../Assets/images/22.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }else{
                    return <Image source={require('../Assets/images/21.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }
            }
        }
    },
    DeletedTasks: {
        screen: DeletedTasksScreen,
        navigationOptions: {
            tabBarIcon: (props) => {
                if(props.focused){
                    return <Image source={require('../Assets/images/7.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }else{
                    return <Image source={require('../Assets/images/8.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }
            }
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarIcon: (props) => {
                if(props.focused){
                    return <Image source={require('../Assets/images/201.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }else{
                    return <Image source={require('../Assets/images/20.png')} style={{height: 25, resizeMode: 'contain', alignSelf: 'center', marginTop: 5}}/>
                }
            }
        }
    }
}, {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    initialRouteName: 'CurrentTasks',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#ECECEC',
            height: 60,
        },
        indicatorStyle: {
            backgroundColor: '#7A7A7A'
        }
    }
})