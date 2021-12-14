import React, { useEffect, useState } from 'react';
import { View,Text, Dimensions, StyleSheet, Alert, ToastAndroid } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle, Inputs, Checkboxs, DefaultButton } from './BOOTSTRAP';
import { MyInfoData, myCommentList, myVoiceCmtList, myEventCmtList, hooplist, validateEmail } from '../dummydata';
import styled from '../style/style';

import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidthHalf = screenWidth * 0.25;

const RegisterContent = ( props ) => {

    const {navigation} = props;

    const [id, setId] = useState('');

    const changeId = text => {
        setId(text);
    }

    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');

    const changePwd = text => {
        setPwd(text);
    }

    const changePwdConfirm = text => {
        setPwdConfirm(text);
    }


    const [passwordChk, setPasswordChk] = useState();

    

    let pwdSize = pwd.length;
    let pwdConfirmSize = pwdConfirm.length;
    
     useEffect(()=>{
       if(pwdSize>0 && pwdConfirmSize>0){
           if(pwd===pwdConfirm){
             setPasswordChk(true)
           }else{
             setPasswordChk(false)
           }
        
       }
     },[pwd, pwdConfirm]);
 


     const [registerName, setRegisterName] = useState('');

     const changeName = text => {
        setRegisterName(text);
    }

     const [registerNick, setRegisterNick] = useState('');
     const changeNick = text => {
        setRegisterNick(text);
    }

     const [provisionAgree, setProvisionAgree] = useState(false);
     const [privacyAgree, setPrivacyAgree] = useState(false);

     const checkedRegister = async () =>{


        if(id.length==0){
            ToastAndroid.show('아이디(이메일)를 입력하세요.', ToastAndroid.SHORT);
            return false;
        }else if(id.length>0 && !validateEmail(id)){
            ToastAndroid.show('아이디가 이메일 형식이 아닙니다.', ToastAndroid.SHORT);
            return false;
        }else if(pwdSize==0){
            ToastAndroid.show('비밀번호를 입력하세요.', ToastAndroid.SHORT);
            return false;
        }else if(pwdConfirmSize==0){
            ToastAndroid.show('비밀번호를 한번 더 입력해주세요.', ToastAndroid.SHORT);
            return false;
        }else if(!passwordChk){
            ToastAndroid.show('입력하신 비밀번호가 동일하지 않습니다.', ToastAndroid.SHORT);
            return false;
        }else if(!registerName){
            ToastAndroid.show('이름을 입력하세요', ToastAndroid.SHORT);
            return false;
        }else if(!registerNick){
            ToastAndroid.show('닉네임을 입력하세요', ToastAndroid.SHORT);
            return false;
        }else if(!provisionAgree){
            ToastAndroid.show('이용약관에 동의해주세요.', ToastAndroid.SHORT);
            return false;
            
        }else if(!privacyAgree){
            ToastAndroid.show('개인정보처리방침에 동의해주세요.', ToastAndroid.SHORT);
            return false;
            
        }


        Api.send('member_join', {  'id' : id, 'password': pwd, 'name': registerName, 'nickName': registerNick  }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;

            if (resultItem.result === 'Y' && arrItems) {
              navigation.navigate('RegisterResult')
              ToastAndroid.show(resultItem.msg, ToastAndroid.SHORT);
              //setVoiceActorData(arrItems);
            }    
        });

        //navigation.navigate('RegisterResult');
       
      
            
      
     }


    return (
        <View>
            <View style={[styled.containerPadding, {paddingVertical:50, backgroundColor:'#fff'}]}>
                <View>
                   
                    <View style={styles.inputBox}>
                        <Inputs
                            placeholder="이메일 주소를 입력하세요."
                            value = { id }
                            onChangeText = { changeId }
                            styleInput={{marginTop:10}}
                        />
                        <Text style={styles.requireText}>*</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Inputs value={pwd} onChangeText = { changePwd } placeholder="비밀번호" styleInput={{marginTop:10}} isPassword={true} />
                        <Text style={styles.requireText}>*</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Inputs value={pwdConfirm} onChangeText = { changePwdConfirm } placeholder="비밀번호 확인" styleInput={{marginTop:10, borderWidth:1}} isPassword={true} />
                        <Text style={styles.requireText}>*</Text>
                    </View>
                    {
                        passwordChk == false &&  <DefaultText texts='비밀번호가 일치하지 않습니다..' style={{color:'red', marginTop:10}} />
                    }
                    <View style={styles.inputBox}>
                        <Inputs texts={registerName} onChangeText = {changeName} placeholder="이름" styleInput={{marginTop:10}} />
                        <Text style={styles.requireText}>*</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Inputs texts={registerNick} onChangeText = {changeNick} placeholder="닉네임" styleInput={{marginTop:10}} />
                        <Text style={styles.requireText}>*</Text>
                    </View>
                </View>
                <View style={{marginTop:30}}>
                    <DefaultText texts="약관 동의" style={{fontFamily:'NotoSansKR-Bold'}} />
                    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                        <Checkboxs onPress={()=>{setProvisionAgree(!provisionAgree)}} checkboxText="이용약관에 동의합니다." chkOn={provisionAgree} textStyles={[{color:'#333'}, styled.notoMedium]} />
                        <DefaultText texts="(필수)" style={[styled.colorPink]} />
                    </View>
                    <View style={{marginTop:20, height:100, borderWidth:1, borderColor:'#e3e3e3', padding:10, borderRadius:5,}}>
                        <DefaultText texts="해당홈페이지에 맞는 회원가입 약관입니다." />
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                        <Checkboxs onPress={()=>{setPrivacyAgree(!privacyAgree)}} checkboxText="개인정보 취급방침에 동의합니다." chkOn={privacyAgree} textStyles={[{color:'#333'}, styled.notoMedium]} />
                        <DefaultText texts="(필수)" style={[styled.colorPink]} />
                    </View>
                    <View style={{marginTop:20, height:100, borderWidth:1, borderColor:'#e3e3e3', padding:10, borderRadius:5,}}>
                        <DefaultText texts="해당홈페이지에 맞는 개인정보 취급방침입니다." />
                    </View>
                </View>
                <View style={{marginTop:20}}>
                    <DefaultButton buttonTitle="회원가입" onPress={checkedRegister} />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputBox:{
        position: 'relative'
    },
    requireText:{
        color:'red',
        fontSize:15,
        position: 'absolute',
        right:8,
        top:12,
      
    }
})

export default RegisterContent;