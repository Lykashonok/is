import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import LoginScreen from "../Screens/Auth/LoginScreen";
import PhoneEnterScreen from '../Screens/Auth/PhoneEnterScreen';
import ConfirmPhoneScreen from '../Screens/Auth/ConfirmPhoneScreen';

export default LoginNavigator = createStackNavigator({
    Login : {
        screen: LoginScreen
    },
    LoginEnter : {
        screen: PhoneEnterScreen
    },
    ConfirmPhone: {
        screen: ConfirmPhoneScreen
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})