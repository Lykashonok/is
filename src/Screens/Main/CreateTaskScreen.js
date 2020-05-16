import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import AirButton from '../../Components/AirButton';
import TopBar from '../../Components/TopBar';
import CalendarPicker from 'react-native-calendar-picker';
import * as TasksActions from '../../Redux/Actions/TasksAction'
import { storeData, USER_TASKS, storeDataArray } from '../../Assets/AsyncStorageManager';

class CreateTaskScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            important: false,
            description: '',
            showCalendar: false,
            selectedStartDate: null,
            isLoading: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    componentDidMount() {
        if (this.props.navigation.state.params.task) {
            let task = this.props.navigation.state.params.task;

            this.setState({
                taskName: task.title,
                description: task.description,
                selectedStartDate: (new Date(task.date)).toDateString(),
                important: task.important
            });
        }
    }

    render(){
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return(
            <SafeAreaView style={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
                <TopBar backButtonHandler={() => this.props.navigation.goBack()} title={this.props.navigation.state.params.task ? "Edit task" : "Create task"}/>
                <KeyboardAvoidingView style={{ flex: 1, width:'100%', flexDirection: 'column',justifyContent: 'center',}}>
                    <ScrollView>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{
                                backgroundColor: 'rgba(238, 238, 238, 0.51)', borderRadius: 5,
                                height: 40, width: '95%', marginTop: 20, flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    style={{paddingLeft: 20, width: '85%'}}
                                    placeholder="Task name"
                                    onChangeText={(taskName) => {
                                        this.setState({taskName})
                                    }}
                                    value = {this.state.taskName}
                                />
                                <View style={{height: '70%', borderLeftWidth: 0.6}}></View>
                                <View style={{height: '100%', width:'15%', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        console.log(this.state.important)
                                        this.setState({important: !this.state.important})
                                    }}>
                                        {
                                            this.state.important ?
                                            <Image style={{height: 30, width: 30}} source={require("../../Assets/images/1.png")}></Image> :
                                            <Image style={{height: 30, width: 30}} source={require("../../Assets/images/12.png")}></Image>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: 'rgba(238, 238, 238, 0.51)', borderRadius: 5,
                                height: 300, width: '95%', marginTop: 30,
                            }}>
                                <TextInput
                                    style={{ 
                                        paddingHorizontal: 20, 
                                        textAlign: 'left'
                                    }}
                                    multiline={true}
                                    placeholder='Description'
                                    onChangeText={(description) => {
                                        this.setState({description})
                                    }}
                                    value={this.state.description}
                                ></TextInput>
                            </View>
                            <View style={{width: '90%', height: this.state.showCalendar ? 400 : 80}}>
                                <View style={{marginTop: 30, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text>Date</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({showCalendar: !this.state.showCalendar})
                                    }}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{paddingRight: 20}}>{
                                                startDate ? 
                                                (new Date(startDate)).toDateString() :
                                                (new Date()).toDateString()
                                            }</Text>
                                            <Image style={{height: 22, width: 22}} source={require("../../Assets/images/5.png")}></Image>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.showCalendar ? 
                                    <CalendarPicker
                                        onDateChange={this.onDateChange}
                                    /> : <></>
                                }
                            </View>
                            <AirButton
                                text= {this.props.navigation.state.params.task ? "Edit task" : "Add task"}
                                onPressHandler={async () => {
                                    this.setState({isLoading: true})
                                    let task = {}

                                    if ( this.props.navigation.state.params.task ) {
                                        //this.props.dispatch
                                        task = this.props.navigation.state.params.task;
                                        this.props.dispatch(TasksActions.removeTask(this.props.navigation.state.params.task))
                                        task.title = this.state.taskName;
                                        task.description = this.state.description;
                                        task.date = this.state.selectedStartDate ? (new Date(this.state.selectedStartDate)).toDateString() : (new Date()).toDateString();
                                        task.important = this.state.important;
                                       
                                    } else {
                                        task = {
                                            type: 'current',
                                            title: this.state.taskName,
                                            important: this.state.important,
                                            description: this.state.description,
                                            date: this.state.selectedStartDate ? (new Date(this.state.selectedStartDate)).toDateString() : (new Date()).toDateString()
                                        };

                                        
                                    }
                                    //await storeDataArray(USER_TASKS, this.props.user.tasks.filter(item => item != null))
                                    
                                    this.props.dispatch(TasksActions.addTask(task))
                                    this.setState({isLoading: false})
                                    this.props.navigation.goBack()
                                    this.props.navigation.state.params.forceUpdateHandler()
                                }}
                                width = {225}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

export default connect(state => ({user: state.user}))(CreateTaskScreen)