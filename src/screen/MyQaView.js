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

const MyQaView = (props) => {


    const {navigation, route} = props;

    const paramsData = props.route.params; //파라미터 값으로 받아온것들 변수로

    //console.log('파라미터 값 : ', paramsData);
    //console.log(paramsData['wr_id'])


    const [myQaView, setMyQaView] = useState([]);

    const MyQaViewApi = async () => {
        Api.send('customer_qaviewComment', { 'wr_id':paramsData['wr_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
               // console.log(resultItem);
                //console.log('결과값 : ', arrItems);

                setMyQaView(arrItems);

            }    
        });
    }

   

    useEffect(()=>{
        MyQaViewApi();
    },[]);


    console.log('댓글 리스트',myQaView);

    const myQaViewSize = myQaView.length;


    const myQaViewComments = myQaView.map((item, index)=>{
        return(
            <View key={index}>
                <View style={{paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                    <DefaultText texts={item['wr_name']} style={[styled.notoBold]} />
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <DefaultText texts="작성일 : " style={{fontSize:13,color:'#666'}} />
                        <DefaultText texts={item['wr_datetime']} style={{fontSize:13, color:'#666'}} />
                    </View>
                    <View style={{marginTop:15}}>
                        <DefaultText texts={item['wr_content']} />
                    </View>
                </View>
            </View>
        )
    })


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="1:1 문의" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                   
               
                    <View>
                        <View style={styles.noticeTitleBox} >
                            <DefaultText texts={paramsData['wr_subject']} style={[styled.fontsize01, styled.notoMedium]} />
                        </View>
                        
                        <View style={styles.noticeContentBox}>
                            <View style={{flexDirection:'row'}}>
                                <DefaultText texts="사용기기 : " style={[styled.notoBold]} />
                                <DefaultText texts={paramsData['wr_1']} />
                                <DefaultText texts={' / ' + paramsData['wr_2']} />
                            </View>
                            <View style={{flexDirection:'row', marginTop:10}}>
                                <DefaultText texts="문의유형 : " style={[styled.notoBold]} />
                                <DefaultText texts={paramsData['wr_3']} />
                            </View>
                            
                            <View style={{marginTop:10}}>
                                <DefaultText texts="문의내용" style={[styled.notoBold]} />
                                <View style={{marginTop:10}}>
                                    <HTML html={'<p>123213</p>'} tagsStyles={StyleHtml} />
                                </View>
                            </View>
                            
                        </View>
                        {/* 댓글 */}
                        <View style={{marginTop:20,marginBottom:20}}>
                            <DefaultText texts="댓글목록" style={[styled.notoBold, {paddingBottom:15,borderBottomWidth:1, borderBottomColor:'#333'}]} />
                            {
                                myQaViewSize > 0 ?
                                myQaViewComments
                                :
                                <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                                <DefaultText texts="등록된 댓글이 없습니다." style={{color:'#999'}} />
                            </View>
                            }
                           
                           
                        </View>
                        {/* 댓글 */}
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

export default MyQaView;