import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert, ToastAndroid} from 'react-native';
import { SectionTitle, DefaultText, Inputs, DefaultButton} from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';
import { Content } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';
import Api from '../Api';

const CouponSubmit = (props) => {


    const {navigation, member_login} = props;

    const userInfos = props.userInfo;

    const [couponNumber, setCouponNumber] = useState('');

    const _couponNumberChange = text => {
        setCouponNumber(text);
    }


    const couponSubmitBtn = async () => {

        if(!couponNumber){
            ToastAndroid.show('쿠폰 번호를 입력하세요.', ToastAndroid.SHORT);
            return false;
        }


        Api.send('coupon_submit', { 'id': userInfos['mb_id'] ,'cp_number': couponNumber }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                ToastAndroid.show(resultItem.message, ToastAndroid.SHORT);
                setCouponNumber('');
                navigation.replace('Mypage', { cateons:3 })
               //setMainSlide(arrItems);
            }else{
                ToastAndroid.show(resultItem.message, ToastAndroid.SHORT);
            }
        });
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="쿠폰등록" style={{marginBottom:10}} /> 
                    <SectionTitle titles="보유하신 쿠폰번호를 확인하시고 등록해주세요." style={{marginBottom:10}} fontSize={{fontSize:13}} colorblack={{color:'#ff53ad'}} fonts={styled.ffTmoneyR} />
                    
                    <View style={styles.couponWrap}>
                        <DefaultText texts="쿠폰번호" style={{marginBottom:10}} />
                        <Inputs placeholder="쿠폰번호를 입력하세요" value={couponNumber} onChangeText={_couponNumberChange} />
                        <DefaultButton buttonTitle="쿠폰사용" buttonStyle={{marginTop:10}} onPress={couponSubmitBtn}/>

                        <DefaultText texts="※ 대소문자 구분없이, - 생략 가능합니다." style={{marginTop:30}}/>

                        <TouchableOpacity onPress={()=>{navigation.navigate('CouponList')}}>
                            <DefaultText texts="쿠폰내역 바로가기" style={[{marginTop:20}, styled.colorPink]} />
                        </TouchableOpacity>
                    </View>

                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    couponWrap :{
        paddingVertical:30,
        paddingHorizontal:20,
        backgroundColor:'#f4f4f4'
    }
})

export default connect(
    ({ User }) => ({
      userInfo: User.userInfo, //회원정보
    }),
    (dispatch) => ({
      member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
      member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
     
    })
  )(CouponSubmit);