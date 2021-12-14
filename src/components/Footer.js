import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { DefaultText } from '../components/BOOTSTRAP';
import style from '../style/style';
import styled from '../style/style';

const Footer = ({navigation}) => {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.footerTopBox}>
                <View style={styles.footerTopNoticeInner}>
                    <DefaultText texts="공지사항" color={styled.colorPink} style={{marginRight:20}} />
                    <TouchableOpacity>
                        <DefaultText texts="유실 발송완료 안내" />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerTopContentInner}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Provision')}}>
                        <DefaultText texts="이용약관" color={styled.colorGray}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('PrivacyContent')}}>
                        <DefaultText texts="개인정보처리방침" color={styled.colorGray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('CustomerCenter')}}>
                        <DefaultText texts="고객센터" color={styled.colorGray} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footerBottomContainer}>
                <DefaultText texts="훌라후프 | 대표 홍길동"  style={{textAlign:'center',marginBottom:7}} color={styled.colorGray}/>
                <DefaultText texts="서울 구로구 디지털로 33길 27, 삼성IT밸리 514호" style={{textAlign:'center',marginBottom:7}}  color={styled.colorGray} />
                <DefaultText texts="사업자 등록번호 113-86-24199"  style={{textAlign:'center',marginBottom:7}} color={styled.colorGray} />
                <DefaultText texts="통신판매업 신고번호 제 2008-서울구로-0747호"  style={{textAlign:'center',marginBottom:7}} color={styled.colorGray} />
                <DefaultText texts="이메일 master@hulahoop.co.kr | 전화 1577-1577"  style={{textAlign:'center',marginBottom:7}} color={styled.colorGray}/>
                <DefaultText texts="Copyright © 훌라후프 Co.,Ltd. All Rights Reserved."  style={{textAlign:'center'}} color={styled.colorGray}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer : {
        backgroundColor: '#f8f8f8',
       
        width:'100%'
    },
    footerTopBox : {
        borderBottomWidth:1,
        borderBottomColor: 'rgba(171,171,171,0.4)'
    },
    footerTopNoticeInner : {
        paddingVertical:15,
        paddingHorizontal: 20,
        flexDirection:'row',
    },
    footerTopContentInner: {
       paddingBottom:15,
        paddingHorizontal: 20,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    footerBottomContainer: {
        paddingVertical:30,
        paddingHorizontal:20
    }
})

export default Footer;