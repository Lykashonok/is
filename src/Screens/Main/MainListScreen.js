import React, { Component } from 'react';
import { Text, View, Animated, SafeAreaView, Dimensions, StyleSheet, Image, Vibration } from 'react-native';
import { TouchableHighlight, FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import TopBar from '../../Components/TopBar';
import { storeData, USER_TASKS, storeDataArray } from '../../Assets/AsyncStorageManager';


// const rightContent = <TouchableOpacity 
//     style={{
//         height: '100%', width: '100%', justifyContent: 'center',
//         backgroundColor: '#FA3D3D', paddingLeft: 20,
//         alignItems: 'flex-start'
//     }}>
//     <Image style={{height: 35, width: 35}} source={require("../../Assets/images/6.png")}/>
    
// </TouchableOpacity>

// const leftContent = (type) => <TouchableOpacity
//     style={{
//         height: '100%', width: '100%', justifyContent: 'center',
//         backgroundColor: '#80FF61', paddingRight: 20,
//         alignItems: 'flex-end'
//     }}>
//     {
//         type == 'finished' || type == 'deleted' ?
//         <Image style={{height: 35, width: 35}} source={require("../../Assets/images/25.png")}/> :
//         <Image style={{height: 35, width: 35}} source={require("../../Assets/images/21.png")}/>
        
//     }
// </TouchableOpacity>

const getTabBarIcon = (props) => {
    const {route} = props
    switch(route.key) {
        case 'current':
            return props.focused ? <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/16.png")}></Image> :
                                   <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/15.png")}></Image>
        case 'finished':
            return props.focused ? <Image style={{height: 25, width: 35}} source={require( "../../Assets/images/22.png")}></Image> :
                                   <Image style={{height: 25, width: 35}} source={require( "../../Assets/images/26.png")}></Image>
        case 'deleted': 
            return props.focused ? <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/6.png")}></Image> :
                                   <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/8.png")}></Image>
        case 'settings':
            return props.focused ? <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/20.png")}></Image> :
                                   <Image style={{height: 30, width: 30}} source={require( "../../Assets/images/20.png")}></Image>
        default:
            return <Icon name='search' size={30} color={'black'}/>
    }
}

//deleteButton, createButton
class MainList extends Component { 
    renderRightActions = (progress, dragX, type, item) => {
        let value = dragX.interpolate({
            inputRange: [-100, -65, 0],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });
        // switch (type) {
        //     case 'current':
        //         this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
        //         break;
        //     case 'finished':
        //         this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
        //         break;
        //     case 'deleted':
        //         delete this.props.user.tasks[this.props.user.tasks.indexOf(item)]
        //         break;
        // }
        // this.forceUpdate();
        return (
            <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: '100%', height: '100%'}}>
                <Animated.View style={{backgroundColor: '#FA3D3D', opacity: value, height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 30}}>
                    <Animated.Image source={require("../../Assets/images/9.png")} style={{ opacity: value , height: 30, width: 30, position: 'absolute', right: 30,}}></Animated.Image>    
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
                        <Animated.Image source={require("../../Assets/images/30.png")} style={{ opacity: value , height: 25, width: 34}}></Animated.Image> :
                        <Animated.Image source={require("../../Assets/images/25.png")} style={{ opacity: value , height: 30, width: 34}}></Animated.Image>
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
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <TopBar title={this.props.title}/>
                <FlatList
                    style={{flex: 1, marginTop: 20}}
                    data={this.props.user.tasks.filter(item => item.type == this.props.type)} 
                    keyExtractor={item => this.props.user.tasks.indexOf(item).toString()}
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
                                    onSwipeableLeftWillOpen={ async () => {
                                        this.setState({isLoading: true})
                                        switch (type) {
                                            case 'current':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'finished';
                                                break;
                                            case 'finished':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'current';
                                                break;
                                            case 'deleted':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'current';
                                                break;
                                        }
                                        await storeDataArray(USER_TASKS, this.props.user.tasks.filter(item => item != null))
                                        this.setState({isLoading: false})
                                        setTimeout(() => this.forceUpdate(), 1000)
                                    }}
                                    onSwipeableRightWillOpen={ async () => {
                                        this.setState({isLoading: true})
                                        switch (type) {
                                            case 'current':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
                                                break;
                                            case 'finished':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
                                                break;
                                            case 'deleted':
                                                delete this.props.user.tasks[this.props.user.tasks.indexOf(item)]
                                                break;
                                        }
                                        await storeDataArray(USER_TASKS, this.props.user.tasks.filter(item => item != null))
                                        this.setState({isLoading: false})
                                        setTimeout(() => this.forceUpdate(), 1000)
                                    }}
                                    onSwipeableWillOpen={() => { Vibration.vibrate(50); }}>
                                    <TouchableOpacity activeOpacity={0.3} style={{justifyContent: 'center', height: '100%', marginLeft: 30}} onPress={() => {
                                        this.props.parentNavigation.navigate('EditTask',{taskIndex: this.props.user.tasks.indexOf(item), forceUpdateHandler: () => this.forceUpdate()})
                                    }}>
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                </Swipeable>
                                {/* <Swipeable 
                                    onLeftActionRelease = {() => {
                                        switch (this.props.type) {
                                            case 'current':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'finished';
                                                break;
                                            case 'finished':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'current';
                                                break;
                                            case 'deleted':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'current';
                                                break;
                                        }
                                        this.forceUpdate();
                                    }}
                                    onRightActionRelease = {() => {
                                        switch (this.props.type) {
                                            case 'current':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
                                                break;
                                            case 'finished':
                                                this.props.user.tasks[this.props.user.tasks.indexOf(item)].type = 'deleted';
                                                break;
                                            case 'deleted':
                                                delete this.props.user.tasks[this.props.user.tasks.indexOf(item)]
                                                break;
                                        }
                                        this.forceUpdate();
                                    }}
                                    leftContent={leftContent(this.props.type)} 
                                    rightContent={rightContent}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.parentNavigation.navigate('EditTask',{taskIndex: this.props.user.tasks.indexOf(item), forceUpdateHandler: () => this.forceUpdate()})
                                        }}
                                        style={{justifyContent: 'center',height: '100%', width: '100%'}}>
                                        <Text style={{alignSelf: 'flex-start', marginLeft: 20}}>{item.title}</Text>
                                    </TouchableOpacity>
                                </Swipeable> */}
                        </View>    
                    )
                }}>
                </FlatList>
                {   
                    this.props.deleteButton || this.props.createButton ?
                    <View style={{
                        position: 'absolute', width: 50, height: 50, bottom: 25, right: 25,
                        backgroundColor: '#ffffff', borderRadius: 100,
                        elevation: 2,
                        shadowOpacity: 0.75,
                        shadowRadius: 5,
                        shadowColor: 'gray',
                        shadowOffset: { height: 20, width: 20 }, 
                    }}>
                        {
                            this.props.createButton ?
                            <TouchableOpacity style={{
                                height: '100%', width: '100%',
                                justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => {
                                    this.props.parentNavigation.navigate('CreateTask', {forceUpdateHandler: () => this.forceUpdate()})
                                }}
                            >
                                <Image style={{height: 35, width: 35}} source={require('../../Assets/images/18.png')}/>
                            </TouchableOpacity> : <></>
                        }
                        {
                            this.props.deleteButton ?
                            <TouchableOpacity style={{
                                height: '100%', width: '100%',
                                justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={{height: 35, width: 35}} source={require('../../Assets/images/7.png')}/>
                            </TouchableOpacity> : <></>
                        }
                    </View> : <></>
                }
            </SafeAreaView>
        )
    }
}

MainList = connect(state => ({user: state.user}))(MainList)

class MainListScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            login: '', 
            password: '',
            isLoading: true,
            swipeEnabled: false,

            index: 0,
            routes: [
                {key: 'current'},
                {key: 'finished'},
                {key: 'deleted'},
                {key: 'settings'},
            ],
        };
    }

    componentDidMount() {
        //loading user
    }

    render(){ 
        return(
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    current: () => <MainList title="Current Tasks" parentNavigation={this.props.navigation} createButton type="current"/>,
                    finished: () => <MainList title="Finished Tasks" parentNavigation={this.props.navigation} deleteButton type="finished"/>,
                    deleted: () => <MainList title="Deleted Tasks" parentNavigation={this.props.navigation} deleteButton type="deleted"/>,
                    settings: () => <MainList title="Settings"/>
                })}
                onIndexChange={index => this.setState({index})}
                initialLayout={{height: 70, width: Dimensions.get('window').width}}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        indicatorStyle={{backgroundColor: 'gray'}}
                        contentContainerStyle={{backgroundColor: '#ECECEC'}}
                        renderIcon={
                            props => getTabBarIcon(props)
                        }
                    />
                }
                swipeEnabled={true}
                tabBarPosition={'bottom'}
            />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBlock :{
        backgroundColor: 'gray',
    },
    noLabel: {
        display: 'none',
        height: 0
    }
})
export default connect(state => ({user: state.user}))(MainListScreen)