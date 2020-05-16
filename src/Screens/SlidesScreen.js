import React, { Component } from 'react';
import { View,Text, SafeAreaView, Image, StyleSheet, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import * as AsyncStorageManager from '../Assets/AsyncStorageManager'

const _renderButton = () => {
    return (
      <TouchableOpacity style={{marginRight: 20, height: 55, width: 30}}>
        <Image style={{height: '60%', width: '60%'}} source={require("../Assets/images/4.png")}/>
      </TouchableOpacity>
    )
  }

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity style={{height: 55, width: 55}}>
        <Image style={{height: '60%', width: '60%'}} source={require("../Assets/images/21.png")}/>
      </TouchableOpacity>
    ) 
  }

  const _renderPrevButton = () => {
    return (
      <TouchableOpacity style={{marginLeft: 20, height: 55, width: 30}}>
        <Image style={{height: '60%', width: '60%'}} source={require("../Assets/images/3.png")}/>
      </TouchableOpacity>
    ) 
  }
  
  const _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, overflow: 'hidden'}}>
            {item}
        </View>
        <View style={{
          width: '100%',
          height: '15%', 
          backgroundColor: 'rgba(255,255,255,0.5)'
        }}/>
      </SafeAreaView>
    );
  }

export default class SlidesScreen extends Component {
    constructor(props) {
        super(props);
    }

    _onDone = () => {
        console.log('slides are done');
        AsyncStorageManager.storeData("@showApp", "true")
        this.props.navigation.navigate('Login')
    }

    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                <AppIntroSlider 
                  style={{flex: 1, backgroundColor: 'white'}}
                  slides={_slides}
                  renderItem={_renderItem}
                  showPrevButton
                  renderPrevButton = {_renderPrevButton}
                  renderNextButton = {_renderButton}
                  renderDoneButton = {_renderDoneButton}
                  keyExtractor = {(item) => _slides.indexOf(item).toString()}
                  onDone = {this._onDone}
                  paginationStyle = {{}}
                  activeDotStyle = {{marginBottom: 15, marginRight: 15, marginLeft: 15,backgroundColor: 'rgba(0,0,0,0.2)' }}
                  dotStyle = {{marginBottom: 15, marginRight: 15, marginLeft: 15,backgroundColor: 'rgba(0,0,0,0.1)' }}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  text : {
    fontSize: 20, 
    lineHeight:30, 
    textAlign: 'center', 
    paddingHorizontal: 10
  },
  text_title : {
    fontSize: 25, 
    lineHeight:30, 
    textAlign: 'center', 
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  recomendation : {
    fontWeight: 'bold',
    fontSize: 20, 
    lineHeight: 30
  }
})

const _slides = [
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View>
      <Image style={{height: 350, width: 350}} source={require("../Assets/images/27.png")}/>
      <Text style={{fontSize: 20, paddingTop: 20, fontWeight: 'bold', textAlign: 'center'}}>Handy</Text>
      <Text style={{textAlign: 'center', paddingTop: 20, fontSize: 18, paddingHorizontal: '20%'}}>Have a convenient way to organise your tasks</Text>  
    </View>
  </View>,
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
    <View>
      <Image style={{height: 350, width: 350}} source={require("../Assets/images/28.png")}/>
      <Text style={{fontSize: 20, paddingTop: 20, fontWeight: 'bold', textAlign: 'center'}}>Edit</Text>
      <Text style={{textAlign: 'center', paddingTop: 20, fontSize: 18, paddingHorizontal: '20%'}}>Add  description and manage priority</Text>  
    </View>
  </View>,
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View>
      <Image style={{height: 350, width: 350}} source={require("../Assets/images/29.png")}/>
      <Text style={{fontSize: 20, paddingTop: 20, fontWeight: 'bold', textAlign: 'center'}}>Manage</Text>
      <Text style={{textAlign: 'center', paddingTop: 20, fontSize: 18, paddingHorizontal: '20%'}}>Stay on track with reminders</Text>  
    </View>  
  </View>
]