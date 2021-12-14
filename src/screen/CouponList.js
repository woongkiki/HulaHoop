import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from '../style/style';
import { Content } from 'native-base';

import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';
import Api from '../Api';

const CouponList = ( props ) => {

    const {navigation, member_login} = props;

    const userInfos = props.userInfo;

   // console.log('cplist: ', userInfos);

    const [cpDataList, setCpDataList] = useState([]);

    const CouponLists = async()=>{
        Api.send('coupon_list', { 'id' : userInfos['mb_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
               setCpDataList(arrItems);
            }
        });
    }

    useEffect(()=>{
        CouponLists();
    },[])

    
    console.log('쿠폰리스트?',cpDataList);


    const _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.cpitemInner}>
                <View style={styles.cpitemView}>
                    <DefaultText texts={item['cp_id']} style={[styled.notoBold]} />
                </View>
                <View style={styles.cpitemView}>
                    <DefaultText texts={item['cp_subject']} />
                </View>
                <View style={styles.cpitemView}>
                    <DefaultText texts={"발급일자 : " + item['cp_start']} />
                </View>
                <View>
                    <DefaultText texts={"사용일자 : " + item['cp_use_date']} />
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="내 쿠폰내역" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            
                <View style={[styled.containerPadding, {paddingTop:25, paddingBottom:80}]}>
                    <FlatList
                        data ={cpDataList}
                        renderItem = {_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                
           
     
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cpitemInner : {
        paddingVertical:20,
        borderTopWidth:1,
        borderTopColor:'#e3e3e3'
    },
    cpitemView : {
        marginBottom:10
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
)(CouponList);