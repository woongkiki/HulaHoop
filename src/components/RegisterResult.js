import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { DefaultText, DefaultButton } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterContent from '../components/RegisterContent';
import styled from '../style/style';
import { Content } from 'native-base';

const RegisterResult = (props) => {

    const {navigation} = props;


    return (
        <SafeAreaView style={{flex:1}}>
            <Header navigation={navigation} />
            <View style={{flex:1,alignItems:'center', justifyContent:'center', paddingHorizontal:20, flexWrap:'wrap'}}>
                <DefaultText texts="회원가입이 완료되었습니다." style={{fontSize:17, fontFamily:'NotoSansKR-Bold'}} />
                <DefaultText texts="회원가입하신 계정으로 로그인하여 훌라후프를 즐겨보세요." style={{marginTop:30}} />

                <DefaultButton buttonTitle="로그인 하기" buttonStyle={{marginTop:20}} onPress={()=>{navigation.navigate('Login');}}/>
            </View>
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
};

export default RegisterResult;