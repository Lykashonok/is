import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
// import MainListScreen from './TabNavigator';
import AccountScreen from '../Screens/Main/AccountScreen'
import ChatListScreen from '../Screens/Main/ChatListScreen'
import ChatScreen from '../Screens/Main/ChatScreen'
import OrderListScreen from '../Screens/Main/OrderListScreen'
import OrderScreen from '../Screens/Main/OrderScreen'
import ItemListScreen from '../Screens/Main/ItemListScreen'
import ItemScreen from '../Screens/Main/ItemScreen'

const MainNavigator = createStackNavigator({
    ChatList : {
        screen: ChatListScreen
    },
    Chat : {
        screen: ChatScreen
    },
    Account : {
        screen: AccountScreen
    },
    OrderList : {
        screen: OrderListScreen
    },
    Order : {
        screen: OrderScreen
    },
    ItemList : {
        screen: ItemListScreen
    },
    Item : {
        screen: ItemScreen
    },
}, {
    headerMode: 'none',
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})

export default MainNavigator