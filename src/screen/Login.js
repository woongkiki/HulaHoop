import { Content } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, View, Image, TextInput, StyleSheet, TouchableOpacity, Alert, Text, ToastAndroid } from 'react-native'

import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomTab from '../components/BottomTab';
import { DefaultText, Inputs, Checkboxs, DefaultButton } from '../components/BOOTSTRAP';
import styled from '../style/style';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';

const Login = ( props ) => {



    const {navigation, member_login} = props;

    const [idText, setIdText] = useState('');
    const _handleIdChange = text => {
        setIdText(text);
    }

    const [pwdText, setPwdText] = useState('');
    const _hadlePwdChange = text => {
        setPwdText(text);
    }

    //체크박스..
    const [idSaveChk, setIdSaveChk] = useState(false);
    const [loginSave, setLoginSave] = useState(false);


    const handleLoginBtn = async () => {

        if(!idText){
            ToastAndroid.show('아이디(이메일)를 입력하세요', ToastAndroid.SHORT);

            return false;
        }

        if(!pwdText){

            ToastAndroid.show('비밀번호를 입력하세요', ToastAndroid.SHORT);

            return false;
        
        }

        const formData = new FormData();
        formData.append('ids', idText);
        formData.append('pwds', pwdText);
        formData.append('method', 'member_login');

        const login = await member_login(formData);

        if(login.state){
            navigation.dispatch(
                StackActions.replace('Home')
            );
            ToastAndroid.show(login.msg, ToastAndroid.SHORT);
            
        }else{
           
            ToastAndroid.show(login.msg, ToastAndroid.SHORT);
        }

        //console.log('로그인정보', login);

    }   
   

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={styles.loginWrapper}>
                    <View style={[styled.containerPadding, {backgroundColor:'#fff'}, styles.loginInner]}>
                        <View>
                            
                            <DefaultText texts="훌라후프 로그인" fontSize={{fontSize:18}} fontFamily={styled.notoBold} style={{marginBottom:20}} />
                            <Inputs value={idText} onChangeText = { _handleIdChange } placeholder="이메일" onSubmitEditing={ ()=>{} } />
                            <Inputs value={pwdText} onChangeText = { _hadlePwdChange } placeholder="비밀번호" styleInput={{marginTop:10}} isPassword={true} />

                            <View style={styles.checkboxWrapper}>
                                <View style={styles.idSaveCheckboxWrap}>
                                   <Checkboxs onPress={()=>{setIdSaveChk(!idSaveChk)}} checkboxText="아이디 저장" chkOn={idSaveChk} /> 
                                </View>
                                <View style={[styles.idSaveCheckboxWrap, {marginLeft:20}]}>
                                    <Checkboxs onPress={()=>{setLoginSave(!loginSave)}} checkboxText="로그인 상태 유지" chkOn={loginSave} />
                                </View>
                            </View>

                            <View style={{marginTop:40}}>
                                <DefaultButton buttonTitle="로그인" onPress={handleLoginBtn} />
                            </View>

                            <View style={styles.loginOtherBtnWrap}>
                                <TouchableOpacity>
                                    <DefaultText texts="아이디/비밀번호 찾기" />
                                </TouchableOpacity>
                                <View style={{width:1, height:15, backgroundColor:'#999', marginHorizontal:20}}></View>
                                <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                                    <DefaultText texts="회원가입" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.snsLoginWrapper}>
                            <DefaultText texts="SNS 로그인" fontSize={{fontSize:18}} fontFamily={styled.notoBold} style={{marginBottom:20}} />
                            <View>
                                <TouchableOpacity style={[styles.snsLoginBtn, {backgroundColor:'#ffeb00'}]}>
                                    <View style={{width:'20%', alignItems:'center'}}>
                                        <Image source={{uri:'http://cnj04.cafe24.com/images/kakao_logo.png'}} style={{width:30, height:28}} />
                                    </View>
                                    <View style={{width:'80%'}}>
                                        <DefaultText texts="카카오 로그인" style={{color:'#3c1e1e'}} fontFamily={styled.notoBold} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.snsLoginBtn, {backgroundColor:'#1fc800'}]}>
                                    <View style={{width:'20%', alignItems:'center'}}>
                                        <Image source={{uri:'http://cnj04.cafe24.com/images/naver_logo.png'}} style={{width:21, height:19}} />
                                    </View>
                                    <View style={{width:'80%'}}>
                                        <DefaultText texts="네이버 로그인" style={{color:'#fff'}} fontFamily={styled.notoBold} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.snsLoginBtn, {backgroundColor:'#3b579d'}]}>
                                    <View style={{width:'20%', alignItems:'center'}}>
                                        <Image source={{uri:'http://cnj04.cafe24.com/images/facebook_logo.png'}} style={{width:13, height:25}} />
                                    </View>
                                    <View style={{width:'80%'}}>
                                        <DefaultText texts="페이스북 로그인" style={{color:'#fff'}} fontFamily={styled.notoBold} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} focusOn={4} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loginWrapper :{
        paddingVertical: 50,
        backgroundColor:'#f7f9fc'
    },
    loginInner:{
        paddingVertical:40,
    },
    checkboxWrapper:{
        flexDirection:'row',
        marginTop:10,
    },
    idSaveCheckboxWrap: {
        flexDirection:'row',
        alignItems:'center'
    },
    loginOtherBtnWrap: {
        marginTop:10,
        paddingTop:10,
        borderTopWidth:1,
        borderTopColor:'#333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    snsLoginWrapper:{
        marginTop:40
    },

    snsLoginBtn:{
        flexDirection:'row',
        height: 50,
        alignItems:'center',
        marginBottom:5
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
  )(Login);