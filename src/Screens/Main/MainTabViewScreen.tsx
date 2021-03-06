import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { CommonUser } from '../../Classes/User'
import { navigationProps } from '../../Interfaces/shortcuts';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import AccountScreen from './AccountScreen'
import { Icon } from 'react-native-elements';
import ChatListScreen from './ChatListScreen';
import ItemListScreen from './ItemListScreen';
import OrderListScreen from './OrderListScreen';
import { connect } from 'react-redux';
import { AppState } from '../../Redux/store/configureStore';
import ItemsSellerScreen from './ItemsSellerScreen';

const FirstRoute = () => (
    <View style={[{ backgroundColor: '#ff4081', flex: 1 }]} />
);

const SecondRoute = () => (
    <View style={[{ backgroundColor: '#673ab7', flex: 1 }]} />
);

interface IMainTabViewScreenProps {
    navigation: navigationProps;
}

type Props = IMainTabViewScreenProps & ILinkStateProps

interface IMainTabViewScreenState {

}

const sceneMap = (navigation:any, type: string): any => {
    switch(type){
        case 'customer':
            return SceneMap({
                first: () => <ItemListScreen navigation={navigation}/>,
                second: () => <ChatListScreen navigation={navigation}/>,
                third: () => <OrderListScreen navigation={navigation}/>,
                fourth: () => <AccountScreen navigation={navigation}/>,
            })
        case 'seller':
            return SceneMap({
                first: () => <ItemListScreen navigation={navigation}/>,
                second: () => <ItemsSellerScreen navigation={navigation}/>,
                third: () => <ChatListScreen navigation={navigation}/>,
                fourth: () => <OrderListScreen navigation={navigation}/>,
                fifth: () => <AccountScreen navigation={navigation}/>,
            })
        default:
            return SceneMap({
                first: () => <ItemListScreen navigation={navigation}/>,
            })
    }
}

const routes = (type: string) => {
    switch(type){
        case 'customer':
            return [
                { key: 'first', title: '', icon: 'search' },
                { key: 'second', title: '', icon: 'message' },
                { key: 'third', title: '', icon: 'inbox' },
                { key: 'fourth', title: '', icon: 'person' },
            ]
        case 'seller':
            return [
                { key: 'first', title: '', icon: 'search' },
                { key: 'second', title: '', icon: 'shopping-cart' },
                { key: 'third', title: '', icon: 'message' },
                { key: 'fourth', title: '', icon: 'inbox' },
                { key: 'fifth', title: '', icon: 'person' },
            ]
        default:
            return [
                { key: 'first', title: 'Find', icon: 'sc-telegram' },
            ]
    }
}   

class MainTabViewScreen extends React.Component<Props, IMainTabViewScreenState> {
    state = {
        index: 0,
        routes: routes(this.props.user.getInfo().type)
    };

    _handleIndexChange = (index: number) => this.setState({ index });

    _renderHeader = (props: any) => <TabBar {...props} />;

    _renderScene = sceneMap(this.props.navigation, this.props.user.getInfo().type)

    _renderIcon = (route : any) => {
        return (
            route.focused?
            <Icon name={route.route.icon} size={32} color="purple"></Icon> :
            <Icon name={route.route.icon} size={32} color="gray"></Icon>
        );
    };

    componentDidMount() {
        
    }

    render() {
        return (
            <TabView
                style={{ flex: 1 }}
                navigationState={this.state}
                renderScene={this._renderScene}
                // renderHeader={this._renderHeader}
                sceneContainerStyle={{backgroundColor: 'white'}}
                onIndexChange={this._handleIndexChange}
                tabBarPosition="bottom"
                initialLayout={{ height: 0, width: Dimensions.get('window').width }}
                renderTabBar={props => 
                    <TabBar
                        {...props}
                        indicatorStyle={{backgroundColor: 'purple'}}
                        renderIcon={(scnee) => this._renderIcon(scnee)}
                        tabStyle={{backgroundColor: 'white'}}
                        labelStyle={{display: 'none'}}
                        activeColor="purple"
                        inactiveColor="gray"
                    />
                }
                lazy={true}
            />
        );
    }
}

interface ILinkStateProps {
    user: CommonUser
  }
  
  const mapStateToProps = (state: AppState, ownProps: IMainTabViewScreenProps): ILinkStateProps => ({
    user: state.user
  })
  
  export default connect(
    mapStateToProps,
  )(MainTabViewScreen)