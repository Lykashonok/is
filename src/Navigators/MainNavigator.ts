import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import AccountScreen from '../Screens/Main/AccountScreen'
import ChatListScreen from '../Screens/Main/ChatListScreen'
import ChatScreen from '../Screens/Main/ChatScreen'
import OrderListScreen from '../Screens/Main/OrderListScreen'
import OrderScreen from '../Screens/Main/OrderScreen'
import ItemListScreen from '../Screens/Main/ItemListScreen'
import ItemScreen from '../Screens/Main/ItemScreen'
import MainTabViewScreen from '../Screens/Main/MainTabViewScreen';
import PreOrderScreen from '../Screens/Main/PreOrder';
import ItemsSellerScreen from '../Screens/Main/ItemsSellerScreen'
import EditItemScreen from '../Screens/Main/EditItemScreen'

const MainNavigator = createStackNavigator({
    MainTabView : {
        screen: MainTabViewScreen
    },
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
    PreOrder : {
        screen: PreOrderScreen
    },
    ItemList : {
        screen: ItemListScreen
    },
    Item : {
        screen: ItemScreen
    },
    ItemsSeller: {
        screen: ItemsSellerScreen
    },
    EditItem: {
        screen: EditItemScreen
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions : {
        ...TransitionPresets.SlideFromRightIOS
    }
})

export default MainNavigator