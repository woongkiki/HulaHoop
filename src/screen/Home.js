import React, {useState, useCallback, useEffect} from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { Content } from 'native-base';
import { SectionTitle } from '../components/BOOTSTRAP';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomTab from '../components/BottomTab';
import MainBanner from '../components/MainBanner';
import PopularBanner from '../components/PopularBanner';
import RecomBanner from '../components/RecomBanner';
import NewBanner from '../components/NewBanner';
import VoiceList from '../components/VoiceList';
import styled from '../style/style';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from '../components/Spinner';

const Home = ( props ) => {


    const {navigation, route,  member_login} = props;

    //console.log('Home: ', props);
  
    const isLogin = props.userInfo;
    
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
    },[navigation])
    //console.log('Home:', isLogin);

    return (
       <View style={{flex:1, backgroundColor:'#fff'}}>
           {
               loading ?
               <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                    <Header navigation={navigation} route={ 1 } />
                    <Content>
                        <View style={{marginBottom:40, alignItems:'center', justifyContent:'center'}}>
                            <MainBanner navigation={navigation} />
                        </View>
                        <View style={[styled.containerPadding, {marginBottom:40,}]}>
                            
                            <SectionTitle otherColor="지금 핫한" titles={"인기작품"} style={{marginBottom:20}} /> 
                            <PopularBanner navigation={navigation} triangle={true} page={true} />
                        
                        </View>
                        <View style={[styled.containerPadding, {marginBottom:40}]}>
                            <SectionTitle otherColor="훌라후프" titles={"추천작"} style={{marginBottom:20}} moreBtn onPress={()=>navigation.navigate('ItemRecom', { ons : 1 })} /> 
                            <RecomBanner navigation={navigation} pageRecom={true} />
                        </View>
                        <View style={[styled.containerPadding, {marginBottom:40}]}>
                            <SectionTitle titles="이달의 신규 출시작 모음" style={{marginBottom:20}} /> 
                            <NewBanner navigation={navigation}  />
                        </View>
                        <View style={[styled.containerPadding, {marginBottom:40}]}>
                            <SectionTitle titles="성우 알아보기" style={{marginBottom:20}} moreBtn onPress={()=>{ navigation.navigate('VoiceAllList') } } /> 
                            <VoiceList navigation={navigation} />
                        </View>
                    
                        <Footer navigation={navigation} />
                    </Content>
                    <BottomTab navigation={navigation} focusOn={1} isLogin={isLogin ? isLogin : false} />
                </SafeAreaView>
                :
                <Spinner />
           }
       </View>
        
    );
};


export default connect(
({ User }) => ({
    userInfo: User.userInfo, //회원정보
}),
(dispatch) => ({
    member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
    member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
    
})
)(Home);