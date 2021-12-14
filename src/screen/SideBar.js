import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, View, StyleSheet, Image , Text, SafeAreaView, Alert, ToastAndroid, Modal} from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import {Content} from 'native-base';
import { DefaultText } from '../components/BOOTSTRAP';
import styled from '../style/style';
import { numberFormat } from '../dummydata'
import { DrawerActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';

const SideBar = (props) => {


    //console.log(props.userInfo);
    const {navigation, member_logout} = props;

    const isLogin = props.userInfo; // 로그인정보 변수저장

   // console.log('로그인정보: ', isLogin);

    const [modalVisible, setModalVisible] = useState(false);


    const handleLogOutBtn = async () => {
        const formData = new FormData();
        formData.append('method', 'member_logout');

        const logOut = await member_logout(formData);

            navigation.dispatch(DrawerActions.closeDrawer())
            navigation.dispatch(
                StackActions.replace('Home')
            );
            
            setModalVisible(false);
            ToastAndroid.show('로그아웃 합니다.', ToastAndroid.SHORT);
   
    }


    const logOutHandler = () => {
        setModalVisible(!modalVisible);
    }


    return (
        <>
        <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop:0, marginTop:0}}>
            <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
                <Content>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalCloseBtn} onPress={()=>navigation.dispatch(DrawerActions.closeDrawer())}>
                            <Image source={require('../images/close_btn.png')} style={{width:50, height:50}}/>
                        </TouchableOpacity>

                        <View style={styles.modalInfoTop}>
                            <View style={styles.myIdTextBox}>
                                <View style={{width:60, height:60, borderRadius:60, backgroundColor:'#333', marginRight: 20}}>

                                </View>
                                {
                                    isLogin ?
                                    <Text style={[styles.myIdText, styled.notoBold]}>{isLogin['mb_nick']} 님</Text>
                                    :
                                    <Text style={[styles.myIdText, styled.notoBold]}>로그인 해주세요.</Text>
                                }
                               
                            </View>
            
                            <View style={{flexDirection:'row', marginTop:20}}>
                                <TouchableOpacity onPress={()=>{ isLogin ? navigation.navigate('Mypage', { cateons:3 } ): navigation.navigate('Login') }} style={[styles.coinBoxBtn, {borderTopLeftRadius:5, borderBottomLeftRadius:5}]}>
                                    <DefaultText texts="후프" />
                                    {
                                        isLogin ?
                                        <Text style={[{fontSize:18, marginTop:10}, styled.colorPink]}>{numberFormat(parseInt(isLogin['mb_point']))}</Text>
                                        :
                                        <Text style={[{fontSize:18, marginTop:10}, styled.colorPink]}>로그인 필요</Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.coinBoxBtn, {borderTopRightRadius:3, borderBottomRightRadius:3}]}>
                                    <DefaultText texts="당근" />
                                    {
                                        isLogin ?
                                      
                                        <Text style={[{fontSize:18, marginTop:10},styled.colorPink]}>{numberFormat(parseInt(isLogin['mb_1']))}</Text>
                                        :
                                        <Text style={[{fontSize:18, marginTop:10}, styled.colorPink]}>로그인 필요</Text>
                                    }
                                    
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                                <TouchableOpacity style={[styles.myInfoBtns, {width:'48%'}]}>
                                    <DefaultText texts="코인충전" />
                                </TouchableOpacity>
                                {
                                    isLogin ? 
                                    <TouchableOpacity style={[styles.myInfoBtns, {width:'48%'}]} onPress={logOutHandler}>
                                   
                                        <DefaultText texts="로그아웃" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={[styles.myInfoBtns, {width:'48%'}]} onPress={()=>(navigation.navigate('Login'))}>
                                   
                                        <DefaultText texts="로그인" />
                                    </TouchableOpacity>
                                }
                                
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.myMenuBtn} onPress={()=>{ isLogin ? navigation.navigate('Mypage', { cateons:1 }) : navigation.navigate('Login') }}>
                                <DefaultText texts="내정보" />
                                <Image source={require('../images/mypage_arrow_r.png')} style={{height:15, width:8}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.myMenuBtn} onPress={()=>{ isLogin ? navigation.navigate('MyBook') : navigation.navigate('Login') }}>
                                <DefaultText texts="내서재" />
                                <Image source={require('../images/mypage_arrow_r.png')} style={{height:15, width:8}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.myMenuBtn} onPress={()=>{Alert.alert('준비중입니다')}}>
                                <DefaultText texts="My list" />
                                <Image source={require('../images/mypage_arrow_r.png')} style={{height:15, width:8}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.myMenuBtn} onPress={()=>{ isLogin ? navigation.navigate('CouponSubmit') : navigation.navigate('Login') }}>
                                <DefaultText texts="쿠폰등록"  />
                                <Image source={require('../images/mypage_arrow_r.png')} style={{height:15, width:8}} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.myMenuBtn} onPress={()=>{navigation.navigate('CustomerCenter')}}>
                                <DefaultText texts="고객센터" />
                                <Image source={require('../images/mypage_arrow_r.png')} style={{height:15, width:8}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </SafeAreaView>
        </DrawerContentScrollView>

        <Modal 
            animationType='fade'
            visible={modalVisible}
          
            transparent={true}
        >
            <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'}}>
                <View style={{width:'90%', paddingVertical:20, backgroundColor:'#fff', paddingHorizontal:20}}>
                    <DefaultText texts="로그아웃" style={[styled.notoBold, styled.fontsize01, styled.lineHeight, {marginBottom:10}]} />
                    <DefaultText texts="정말 로그아웃 하시겠습니까?" style={{marginBottom:20}} />
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity style={[styles.logOutBtn, {backgroundColor:'#f4f4f4'}]} onPress={()=>{ setModalVisible(false) }} >
                            <DefaultText texts="아니오" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.logOutBtn, {backgroundColor:'#f555a9'}]} onPress={handleLogOutBtn}>
                            <DefaultText texts="네" style={{color:'#fff'}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
    },
    modalCloseBtn: {
        position:'absolute',
        right:0,
        top:0,
        zIndex:100
    },
    modalInfoTop: {
        padding:20,
        backgroundColor:'#f555a9'
    },
    myIdTextBox: {
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        marginBottom:20
    },
    myIdText: {
        fontSize:20,
        color:'#fff',
        lineHeight:25
    },
    myInfoBtns: {
        backgroundColor:'#fff',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:35
    },
    coinBoxBtn: {
        backgroundColor:'#fff',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        width:'50%',
    },
    myMenuBtn: {
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3'
    },
    textInputs: {
        paddingLeft:20,
        fontSize:18,
        flex:6,
        
    },
    logOutBtn:{
        width:'47%',
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    }
})

export default connect(
    ({ User }) => ({
      userInfo: User.userInfo, //회원정보
    }),
    (dispatch) => ({
      member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
      member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
      member_logout: (data) => dispatch(UserAction.member_logout(data)), //로그아웃
    })
  )(SideBar);