import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import store from '../redux/configureStore';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import {Root } from 'native-base';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

import Home from './Home';
import Sidebar from './SideBar';
import ItemRecom from './ItemRecom';
import ItemList from './ItemList';
import ItemView from './ItemView';
import EventList from './EventList';
import EventView from './EventView';
import Mypage from './Mypage';
import Login from './Login';
import MyBook from './MyBook';
import MyList from './MyList';
import CouponSubmit from './CouponSubmit';
import CouponList from './CouponList';
import CustomerCenter from './CustomerCenter';
import MyQaView from './MyQaView';
import Provision from './Provision';
import PrivacyContent from './PrivacyContent';
import SearchResult from './SearchResult';
import VoiceAllList from './VoiceAllList';
import VoiceView from './VoiceView';
import NoticeView from './NoticeView';
import Register from './Register';
import RegisterResult from '../components/RegisterResult';
import Shop from './Shop';
import ShopItemView from './ShopItemView';

import Player from './Player';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Stack_Navigation(props) {
  return (
      <Stack.Navigator
          options={{headerShown:false}}
          initialRouteName="HulaHoop"
          
        >
          <Stack.Screen name="Home" component={Home} options= {{headerShown:false}} />
          <Stack.Screen name="ItemRecom" component={ItemRecom} options= {{headerShown:false}} />
          <Stack.Screen name="ItemList" component={ItemList} options= {{headerShown:false}} />
          <Stack.Screen name="ItemView" component={ItemView} options={{headerShown:false}}/>
          <Stack.Screen name="EventList" component={EventList} options={{headerShown:false}} />
          <Stack.Screen name="EventView" component={EventView} options={{headerShown:false}} />
          <Stack.Screen name="Mypage" component={Mypage} options={{headerShown:false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
          <Stack.Screen name="RegisterResult" component={RegisterResult} options={{headerShown:false}} />
          <Stack.Screen name="MyBook" component={MyBook} options={{headerShown:false}} />
          <Stack.Screen name="MyList" component={MyList} options={{headerShown:false}} />
          <Stack.Screen name="CouponSubmit" component={CouponSubmit} options={{headerShown:false}} />
          <Stack.Screen name="CouponList" component={CouponList} options={{headerShown:false}} />
          <Stack.Screen name="CustomerCenter" component={CustomerCenter} options={{headerShown:false}} />
          <Stack.Screen name="MyQaView" component={MyQaView} options={{headerShown:false}} />
          <Stack.Screen name="Provision" component={Provision} options={{headerShown:false}} />
          <Stack.Screen name="PrivacyContent" component={PrivacyContent} options={{headerShown:false}} />
          <Stack.Screen name="SearchResult" component={SearchResult} options={{headerShown:false}} />
          <Stack.Screen name="VoiceAllList" component={VoiceAllList} options={{headerShown:false}} />
          <Stack.Screen name="VoiceView" component={VoiceView} options={{headerShown:false}} />
          <Stack.Screen name="NoticeView" component={NoticeView} options={{headerShown:false}} />

          <Stack.Screen name="Shop" component={Shop} options={{headerShown:false}} />
          <Stack.Screen name="ShopItemView" component={ShopItemView} options={{headerShown:false}} />

          <Stack.Screen name="Player" component={Player} options={{headerShown:false}} />

          


      </Stack.Navigator>
  )
}

const Main = (props) => {


  setTimeout(() => {

    SplashScreen.hide();
    
    }, 1000);

  const toastConfig = {
      'custom_type': (internalState) => (
          <View style={{ width:'70%', backgroundColor: '#000000e0', borderRadius:10, paddingVertical:10, opacity:0.8 }}>
              <Text style={{ textAlign:'center', color:'#FFFFFF', fontSize:16, lineHeight:22 , letterSpacing:-0.38 }}>{internalState.text1}</Text>
          </View>
      )
  }

  return (
    <Provider store={store}>
       <Root>
         <PaperProvider>
          <NavigationContainer>
            <Drawer.Navigator
            drawerStyle={{width:'100%'}}
              drawerContent={props=><Sidebar {...props}/>}
            >
              <Drawer.Screen name="Stack_Navigation" component={Stack_Navigation} options={{headerShown:false}} />
            </Drawer.Navigator>
          </NavigationContainer>
          <Toast config={toastConfig} ref={(ref)=>Toast.setRef(ref)} />
        </PaperProvider>
      </Root>
    </Provider>
  );
};

export default Main;