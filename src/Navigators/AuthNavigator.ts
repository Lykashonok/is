import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen from "../Screens/Auth/RegisterScreen"

const AuthNavigator = createStackNavigator({
    Login : {
        screen: LoginScreen
    },
    Register : {
        screen: RegisterScreen
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})

export default AuthNavigator