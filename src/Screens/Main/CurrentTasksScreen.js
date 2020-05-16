import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import TasksList from '../../Components/TasksList'
import * as TasksActions from '../../Redux/Actions/TasksAction'

class CurrentTasksScreen extends Component {
    state = {

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Current Tasks</Text>
                </View>
                <TasksList parentNavigation={this.props.navigation} 
                           tasks={this.props.tasks.current}
                           removeTask={(item) => {
                                this.props.dispatch(TasksActions.removeTask(item))
                           }}
                           addTask={(item) => {
                                this.props.dispatch(TasksActions.addTask(item))
                           }}
                           forceUpdateHandler={() => {
                            this.forceUpdate()
                            console.log(this.props.tasks, '\n\n\n')
                           }}/>
                <TouchableOpacity style={styles.floating} onPress={() => this.props.navigation.navigate('CreateTask', {
                    forceUpdateHandler: () => {
                        this.forceUpdate()
                    }
                })}>
                    <Image source={require('../../Assets/images/18.png')} style={styles.floatingImage}/>
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
        width:40
    }
})

export default connect(state => ({tasks: state.tasks}))(CurrentTasksScreen)