import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import AirButton from '../../Components/AirButton';
import TopBar from '../../Components/TopBar';
import CalendarPicker from 'react-native-calendar-picker';
import { MenuProvider } from 'react-native-popup-menu';
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers,  } from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

class EditTaskScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            important: false,
            description: '',
            selectedStartDate: null,
            showCalendar: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    componentDidMount(){
        console.log('qwwwwwwwwwwwwww')
    }

    render(){
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        
        const task = this.props.navigation.state.params.task

        return(
            <SafeAreaView style={{height: '100%', width: '100%'}}>
                <MenuProvider style={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
                    <TopBar 
                        menuButtonHandler={() => this.menu.props.ctx.menuActions.toggleMenu('menu')}
                        backButtonHandler={() => this.props.navigation.goBack()} title={task.title}/>
                    <KeyboardAvoidingView style={{ height:'100%', width:'100%', flexDirection: 'column',justifyContent: 'center',}}>
                        <Menu
                            ref={ref => this.menu = ref}
                            name="menu" 
                            renderer={SlideInMenu} 
                            onSelect={value => this.selectNumber(value)}
                        >
                            <MenuTrigger>
                            </MenuTrigger>
                            <MenuOptions style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
                                <MenuOption onSelect={() => {
                                    this.props.navigation.navigate('CreateTask', {task: task, forceUpdateHandler: () => this.forceUpdate()})
                                }} >
                                    <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
                                        <Image style={{marginHorizontal: 15, height: 26, width: 26}} source={require("../../Assets/images/10.png")}></Image>
                                        <Text>Edit</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => {
                                    this.props.navigation.state.params.removeTask(task)
                                    task.type = 'finished';
                                    this.props.navigation.state.params.addTask(task)
                                    this.props.navigation.goBack();
                                }} >
                                    <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
                                        <Image style={{marginHorizontal: 15, height: 20, width: 26}} source={require("../../Assets/images/24.png")}></Image>
                                        <Text>Finish</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption onSelect={() => {
                                    this.props.navigation.state.params.removeTask(task)
                                    task.type = 'deleted';
                                    this.props.navigation.state.params.addTask(task)
                                    this.props.navigation.goBack();
                                }} >
                                    <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
                                        <Image style={{marginHorizontal: 15, height: 26, width: 26}} source={require("../../Assets/images/7.png")}></Image>
                                        <Text>Delete</Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                        <ScrollView contentContainerStyle={{height: '100%'}}>
                            <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
                                <View style={{
                                    backgroundColor: 'rgba(238, 238, 238, 0.51)', borderRadius: 5,
                                    height: 'auto', width: '95%', marginTop: 30, paddingVertical: 20, paddingHorizontal: 10
                                }}>
                                    <Text style={{fontSize: 16}}>{task.description}</Text>
                                </View>
                                <View style={{width: '90%', paddingTop: 40}}>
                                    <Text style={{textAlign: 'center'}}>{task.date}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    {/* <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                        <View style={{height: 120, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}>
                            <TouchableOpacity style={{width:'100%', height: 40, alignItems: 'center', paddingLeft: 20, flexDirection: 'row'}}
                                onPress={() => {
                                    this.props.navigation.navigate('CreateTask', {taskIndex: taskIndex, forceUpdateHandler: () => this.forceUpdate()})
                                }}
                            >
                                <Image style={{height: 26, width: 26}} source={require("../../Assets/images/10.png")}></Image>
                                <Text style={{marginLeft: 20}}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'100%', height: 40, alignItems: 'center', paddingLeft: 20, flexDirection: 'row'}}
                                onPress={() => {
                                    let index = this.props.navigation.state.params.taskIndex;
                                    this.props.user.tasks[index].type = 'finished';
                                    this.props.navigation.goBack();
                                    this.props.navigation.state.params.forceUpdateHandler()
                                }}
                            >
                                <Image style={{height: 20, width: 26}} source={require("../../Assets/images/24.png")}></Image>
                                <Text style={{marginLeft: 20}}>Finish</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'100%', height: 40, alignItems: 'center', paddingLeft: 20, flexDirection: 'row'}}
                                onPress={() => {
                                    let index = this.props.navigation.state.params.taskIndex;
                                    this.props.user.tasks[index].type = 'deleted';
                                    this.props.navigation.goBack();
                                    this.props.navigation.state.params.forceUpdateHandler()
                                }}
                            >
                                <Image style={{height: 25, width: 25}} source={require("../../Assets/images/7.png")}></Image>
                                <Text style={{marginLeft: 20}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </MenuProvider>
            </SafeAreaView>
        )
    }
}

export default connect(state => ({user: state.user}))(EditTaskScreen)