import React, {useEffect, useState} from 'react';
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from './BOOTSTRAP';
import { textLengthOverCut, itemingCatergory, numberFormat, ItemSellList, ItemEmpty, SubscribeData, SubscribeVoiceData } from '../dummydata';
import styled from '../style/style';
import PageTabList from '../components/PageTabList';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';
import Api from '../Api';

const { width: screenWidth } = Dimensions.get("window");

const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.45-10;
const itemHeight = slideWidth * 0.45-10;



const MyBookContent = (props) => {
    
    const {navigation, member_login} = props;

    const userInfos = props.userInfo;


    //console.log(userInfos);

    const [category, setCategory] = useState(1);

    const [myWorkSellList, setMyWorkSellList] = useState([]);

    const MyWorkSellList = async () => {
        Api.send('member_sellwork', {'id': userInfos['mb_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                //console.log(resultItem);
                setMyWorkSellList(arrItems); // 소장중인작품..
            }    
        });
    }

    useEffect(()=>{
        MyWorkSellList();
    },[]);


    const [subscribeList, setSubsribeList] = useState([]);

    const MyWorkGoodList = async () => {
        Api.send('item_good', {'id': userInfos['mb_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

               // console.log(resultItem);
               setSubsribeList(arrItems);
            }    
        });
    }

    const [voiceSubscribeList, setVoiceSubsribeList] = useState([]);

    const MyVoiceSubscribList = async () => {
        Api.send('voice_good', {'id': userInfos['mb_id'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

               // console.log('성우 구독 리스트 결과 :', resultItem);
               // console.log('성우 구독 데이터 :', arrItems);
               setVoiceSubsribeList(arrItems);
            }    
        });
    }


    useEffect(()=>{
        MyWorkGoodList();
        MyVoiceSubscribList();
    },[category])


    //console.log(subscribeList);


    const MyBookComponents = ( {uri, title, writer, index, onPress}) => {
        return(
            <View key={index}>
                <TouchableOpacity  style={{width:slideImageWidth, marginTop:30}} onPress={onPress}>
                    <Image source={{uri:uri}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
                    <View style={styles.titleBox}>
                        <DefaultText texts={textLengthOverCut(title, 10)} />
                    </View>
                    {
                        writer &&
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <DefaultText texts={textLengthOverCut(writer, 10)} style={[styled.colorGray]} />
                        
                        </View>
                    }
                
                </TouchableOpacity>
             </View>
        )
    }

    


    const myWorkCnt = myWorkSellList.length;

    

    const Mywork = ({navigation}) =>{

        const itemLists = myWorkSellList.map((item, index)=>(
        
            <View key={index}>
                <TouchableOpacity  style={{width:slideImageWidth, marginTop:30}} onPress={()=>{ navigation.navigate('ItemView', item )}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
                    <View style={styles.titleBox}>
                        <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
                    </View>
                   
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <DefaultText texts={textLengthOverCut(item.writer, 10)} style={[styled.colorGray]} />
                        
                        </View>                
                </TouchableOpacity>
             </View>
        ))

        return(
            <View>
                {
                    myWorkCnt > 0 ?
                    <>
                        <View style={{marginBottom:20}}>
                            <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20}]}>소장 작품 총 <Text style={[styled.colorPink]}>{myWorkCnt}작품</Text></Text>
                        </View>
                        <View style={{borderTopWidth:1, borderTopColor:'#e3e3e3'}}>
                            <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
                                {itemLists}
                            </View>
                        </View>
                    </>
                    : 
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="소장 중인 작품이 없습니다." style={{color:'#999'}} />
                    </View>
                
                }
            </View>
        )
    }

    const latelyaudioCnt = ItemEmpty.length;
    const latelyAudioDataList = ItemEmpty.map((item, index)=>{

        return(
            <MyBookComponents index={index}  uri={item.imageUrl} title={item.title} writer={item.writer} onPress={()=>{ navigation.navigate('ItemView', item )}} />
        )
    })

    const LatelyAudioList = ({navigation}) =>{
        return(
            <View>
                {
                    latelyaudioCnt > 0 ?
                    <>
                        <View style={{marginBottom:20}}>
                            <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20}]}>최근 들은 작품 <Text style={[styled.colorPink]}>{latelyaudioCnt}작품</Text></Text>
                        </View>
                        <View style={{borderTopWidth:1, borderTopColor:'#e3e3e3'}}>
                            <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
                                {latelyAudioDataList}
                            </View>
                        </View>
                    </>
                    : 
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="최근 들은 작품이 없습니다." style={{color:'#999'}} />
                    </View>
                }
            </View>
        )
    }

    const SubscribeDataCnt = subscribeList.length;
    const SubscribeDataList = subscribeList.map((item, index)=> {
        return(
            <View key={index}>
                <TouchableOpacity  style={{width:slideImageWidth, marginTop:30}} onPress={()=>{ navigation.navigate('ItemView', item )}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
                    <View style={styles.titleBox}>
                        <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
                    </View>
                   
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <DefaultText texts={textLengthOverCut(item.writer, 10)} style={[styled.colorGray]} />
                        
                        </View>                
                </TouchableOpacity>
             </View>
        )
    })
    const SubscribeWork = ({navigation}) =>{
        return(
            <View>
                {
                    SubscribeDataCnt > 0 ?
                    <>
                        <View style={{marginBottom:20}}>
                            <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20}]}>구독 작품 총 <Text style={[styled.colorPink]}>{SubscribeDataCnt}작품</Text></Text>
                        </View>
                        <View style={{borderTopWidth:1, borderTopColor:'#e3e3e3'}}>
                            <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
                                {SubscribeDataList}
                            </View>
                        </View>
                    </>
                    : 
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="구독한 작품이 없습니다." style={{color:'#999'}} />
                    </View>
                }
            </View>
        )
    }

    const SubscribeVoiceDataCnt = voiceSubscribeList.length;
    const SubscribeVoiceDataList = voiceSubscribeList.map((item, index)=>{
        return(
            
            <View key={index}>
                <TouchableOpacity  style={{width:slideImageWidth, marginTop:30}} onPress={()=>{ navigation.navigate('VoiceView', item )}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
                    <View style={styles.titleBox}>
                        <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
                    </View>               
                </TouchableOpacity>
             </View>
        )
    })
    const SubscribeVoice = ({navigation}) =>{
        return(
            <View>
                {
                    SubscribeVoiceDataCnt > 0 ?
                    <>
                        <View style={{marginBottom:20}}>
                            <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20}]}>구독 성우 총 <Text style={[styled.colorPink]}>{SubscribeVoiceDataCnt}명</Text></Text>
                        </View>
                        <View style={{borderTopWidth:1, borderTopColor:'#e3e3e3'}}>
                            <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
                                {SubscribeVoiceDataList}
                            </View>
                        </View>
                    </>
                    : 
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="구독한 성우가 없습니다." style={{color:'#999'}} />
                    </View>
                }
            </View>
        )
    }

    return (
        <View>
            <View style={styles.Category}>
                <PageTabList title="소장작품" buttonStyle={{marginRight:15}} tabOn={category === 1} onPress={() => setCategory(1)} />
                <PageTabList title="최근 들은 작품" buttonStyle={{marginRight:15}} tabOn={category === 2} onPress={() => setCategory(2)} />    
                <PageTabList title="구독작품" buttonStyle={{marginRight:15}} tabOn={category === 3} onPress={() => setCategory(3)} />
                <PageTabList title="구독성우" tabOn={category === 4} onPress={() => setCategory(4)} />
            </View>
            <View>
               
                {
                    category === 1 && <Mywork navigation={navigation} />
                }
                {
                    category === 2 && <LatelyAudioList navigation={navigation} />
                }
                {
                    category === 3 && <SubscribeWork navigation={navigation} />
                }
                {
                    category === 4 && <SubscribeVoice navigation={navigation} />
                }
                
            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Category : {
        flexDirection: 'row',
        marginBottom:30
    },
    titleBox : {
        marginVertical:10
    },
    titleText: {
        fontSize:17,
        
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
)(MyBookContent);