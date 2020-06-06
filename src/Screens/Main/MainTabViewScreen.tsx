import styles from '../../Styles/main';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { navigationProps } from '../../Interfaces/shortcuts';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import AccountScreen from './AccountScreen'
import { Icon } from 'react-native-elements';
import ChatScreen from './ChatScreen';
import ChatListScreen from './ChatListScreen';
import ItemListScreen from './ItemListScreen';

const FirstRoute = () => (
    <View style={[{ backgroundColor: '#ff4081', flex: 1 }]} />
);

const SecondRoute = () => (
    <View style={[{ backgroundColor: '#673ab7', flex: 1 }]} />
);

interface IMainTabViewScreenProps {
    navigation: navigationProps;
}

interface IMainTabViewScreenState {

}

class MainTabViewScreen extends React.Component<IMainTabViewScreenProps, IMainTabViewScreenState> {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Find', icon: 'sc-telegram' },
            { key: 'second', title: 'ChatList', icon: 'cart' },
            { key: 'third', title: 'Account', icon: 'cart' },
        ],
    };

    _handleIndexChange = (index: number) => this.setState({ index });

    _renderHeader = (props: any) => <TabBar {...props} />;

    _renderScene = SceneMap({
        first: () => <ItemListScreen navigation={this.props.navigation}/>,
        second: () => <ChatListScreen navigation={this.props.navigation}/>,
        third: () => <AccountScreen navigation={this.props.navigation}/>,
    });

    _renderIcon = (route : any) => {
        return (
            <Icon name={route.icon} size={24} color="black"></Icon>
            // <></>
        );
    };

    componentDidMount() {
        // this._renderScene = 
    }

    render() {
        return (
            <TabView
                style={{ flex: 1 }}
                navigationState={this.state}
                renderScene={this._renderScene}
                // renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                tabBarPosition="bottom"
                initialLayout={{ height: 0, width: Dimensions.get('window').width }}
                renderTabBar={props => 
                    <TabBar
                        {...props}
                        indicatorStyle={{backgroundColor: 'gray'}}
                        renderIcon={this._renderIcon}
                        // tabStyle={{backgroundColor: 'white'}}
                        // labelStyle={{opacity: 1}}
                        // activeColor="purple"
                        // inactiveColor="rgba(120,12,12,1)"
                    />
                }
                lazy={true}
            />
        );
    }
}

export default MainTabViewScreen