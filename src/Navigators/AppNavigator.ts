import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { TransitionPresets } from 'react-navigation-stack'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import SlidesScreen from '../Screens/SlidesScreen'

const SwitchNavigationConfig = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    Slides: {
        screen: SlidesScreen
    },
    Main: {
        screen: MainNavigator
    }
}, {
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})

export default createAppContainer(SwitchNavigationConfig)