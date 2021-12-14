import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VoiceList from '../components/VoiceList';
import styled from '../style/style';
import { Content } from 'native-base';
import PageTabList from '../components/PageTabList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyleHtml from '../style/StyleHtml';
import HTML from 'react-native-render-html';
import Api from '../Api';

const NoticeView = (props) => {


    const {navigation, route} = props;

    const paramsData = props.route.params; //파라미터 값으로 받아온것들 변수로


    //console.log(paramsData['wr_id'])


    const [category, setCategory] = useState(1);

    const [noticeViewApi, setNoticeViewApi] = useState('');

    const NoticeViewApi = async () => {
        Api.send('board_noticeView', { 'wr_id':paramsData['wr_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

               setNoticeViewApi(arrItems);
               // setNoticeApi(arrItems);
            }    
        });
    }

    useEffect(()=>{
        NoticeViewApi();
    },[])

    console.log('데이터리스트', noticeViewApi);
    //console.log(params);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="공지사항" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                   
               
                    <View>
                        <View style={styles.noticeTitleBox} >
                            <DefaultText texts={noticeViewApi['wr_subject']} style={[styled.fontsize01, styled.notoMedium]} />
                        </View>
                        <View style={styles.noticeContentBox}>
                            <HTML html={noticeViewApi['wr_content'] ? noticeViewApi['wr_content'] : '<p></p>'} tagsStyles={StyleHtml} />
                            
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('CustomerCenter')}} style={{backgroundColor:'#333', paddingVertical:5, paddingHorizontal:10, borderRadius:5}}>
                                <DefaultText texts="목록" style={{color:'#fff'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Category : {
        flexDirection: 'row',
        marginBottom:30
    },
    noticeTitleBox:{
        padding:20,
        backgroundColor:'#f5f5f5'
    },
    noticeContentBox: {
        paddingHorizontal:10,
        paddingVertical:20

    }
})

export default NoticeView;