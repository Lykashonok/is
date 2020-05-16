import React, { Component } from 'react';
import { Text, View, Animated, SafeAreaView, Dimensions, StyleSheet, Image, Vibration } from 'react-native';
import { TouchableHighlight, FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import { storeData, USER_TASKS, storeDataArray } from '../Assets/AsyncStorageManager';



export default class TasksList extends Component { 
    renderRightActions = (progress, dragX, type, item) => {
        let value = dragX.interpolate({
            inputRange: [-100, -65, 0],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: '100%', height: '100%'}}>
                <Animated.View style={{backgroundColor: '#FA3D3D', opacity: value, height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 30}}>
                    <Animated.Image source={require("../Assets/images/9.png")} style={{ opacity: value , height: 30, width: 30, position: 'absolute', right: 30,}}></Animated.Image>    
                </Animated.View>                
            </View>
        );
    };

    renderLeftActions = (progress, dragX, type, item) => {
        let value = dragX.interpolate({
            inputRange: [0, 65, 100],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });
        return (
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: '100%'}}>
                <Animated.View style={{backgroundColor: '#80FF61', opacity: value, height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 30}}>
                    {
                        type === 'current' ?
                        <Animated.Image source={require("../Assets/images/30.png")} style={{ opacity: value , height: 25, width: 34}}></Animated.Image> :
                        <Animated.Image source={require("../Assets/images/25.png")} style={{ opacity: value , height: 30, width: 34}}></Animated.Image>
                    }
                </Animated.View>
            </View>
        );
    };

    onOpen = () => {
        if(this.swipeableReference) {
            this.swipeableReference.close();
        }
    }

    updateReference = (reference) => {
        this.swipeableReference = reference;
    };

    render(){
        return(
            <FlatList
                    style={{flex: 1, marginTop: 5}}
                    data={this.props.tasks} 
                    keyExtractor={item => this.props.tasks.indexOf(item).toString()}
                    renderItem={({item}) => {
                        let type = item.type; 
                        return( 
                            <View style={{
                                width: '100%', height: 50,
                                backgroundColor: '#F3F3F3',
                                marginVertical: 5
                            }}>
                                <Swipeable
                                    ref={this.updateReference}
                                    childrenContainerStyle={{height: '100%', width: '100%', backgroundColor: '#ECECEC'}}
                                    rightThreshold={90}
                                    leftThreshold={120}
                                    renderRightActions={(progress, dragX) => this.renderRightActions(progress, dragX, type, item)}
                                    renderLeftActions={(progress, dragX) => this.renderLeftActions(progress, dragX, type, item)}
                                    onSwipeableOpen={this.onOpen}
                                    onSwipeableLeftOpen={ async () => {
                                        this.setState({isLoading: true})
                                        let task = item;
                                        this.props.removeTask(task);

                                        switch (task.type) {
                                            case 'current':
                                                task.type = 'finished';
                                                break;
                                            case 'finished':
                                                task.type = 'current';
                                                break;
                                            case 'deleted':
                                                task.type = 'current';
                                                break;
                                        }
                                        this.props.addTask(task)
                                        //await storeDataArray(USER_TASKS, this.props.user.tasks.filter(item => item != null))
                                        this.setState({isLoading: false})
                                        //setTimeout(() => this.forceUpdate(), 1000)
                                    }}
                                    onSwipeableRightOpen={ async () => {
                                        this.setState({isLoading: true})
                                        let task = item;
                                        this.props.removeTask(task);

                                        switch (task.type) {
                                            case 'current':
                                                task.type = 'deleted';
                                                this.props.addTask(task)
                                                break;
                                            case 'finished':
                                                task.type = 'deleted';
                                                this.props.addTask(task)
                                                break;
                                            case 'deleted':
                                                break;
                                        }
                                        //await storeDataArray(USER_TASKS, this.props.user.tasks.filter(item => item != null))
                                        this.setState({isLoading: false})
                                        // /setTimeout(() => this.forceUpdate(), 1000)
                                    }}
                                    onSwipeableOpen={() => { Vibration.vibrate(50); }}>
                                    <TouchableOpacity activeOpacity={0.3} style={{justifyContent: 'center', height: '100%', marginLeft: 30}} onPress={() => {
                                        if(item.type == "current"){
                                            this.props.parentNavigation.navigate('ShowTask', {task: item, forceUpdateHandler: () => {
                                                this.props.forceUpdateHandler()
                                                console.log(this.props.tasks)
                                            }, removeTask: this.props.removeTask, addTask: this.props.addTask})
                                        }
                                    }}>
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                </Swipeable>
                        </View>    
                    )
                }}>
            </FlatList>
        )
    }
}
