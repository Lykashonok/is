import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import MainListScreen from './TabNavigator';
import CreateTaskScreen from '../Screens/Main/CreateTaskScreen';
import EditTaskScreen from '../Screens/Main/EditTaskScreen';

export default LoginNavigator = createStackNavigator({
    MainList : {
        screen: MainListScreen
    },
    CreateTask : {
        screen: CreateTaskScreen
    },
    ShowTask: {
        screen: EditTaskScreen
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})