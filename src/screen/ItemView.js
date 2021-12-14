import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Alert, Dimensions, TouchableOpacity, Share, ToastAndroid, Modal} from 'react-native';
import { SectionTitle, DefaultText, Inputs, DefaultButton } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '../style/style';
import { Content } from 'native-base';
import { numberFormat, voiceListWork } from '../dummydata';
import PageTabList from '../components/PageTabList'
import StyleHtml from '../style/StyleHtml';
import HTML from 'react-native-render-html';
import Api from '../Api';
import Spinner from '../components/Spinner';
import Player from '../screen/Player';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidth = screenWidth * 0.42;
const slideImageWidth = slideWidth * 0.2;

const ItemView = ( props ) => {


    const { navigation, route, member_login } = props;
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState(props.route.params);

    const userInfos = props.userInfo; // 로그인시 회원정보 받아옴

    let mb_ids = '';
    if(!userInfos){

        navigation.navigate('Login');
    }else{
        mb_ids = userInfos['mb_id'];
    }
   
    //console.log('아이템 상세 로그인 정보: ',userInfos['mb_id']);

    const [workViewContent, setWorkViewContent] = useState([]); // 작품 상세 전체
    const [workVoiceActor, setWorkVoiceActor] = useState([]); // 작품 성우명 배열로 받음
    const [workKeyword, setWorkKeyword] = useState([]);
    const [workCategory, setWorkCategory] = useState('');
    const [workCommentList, setWorkCommentList] = useState([]);
   // console.log('오키:',params['ca_id']);
   
    const WorkView = async () => { //작품 상세 관련
        Api.send('work_view', { 'wr_id_post' : params['wr_id'], 'ca_id': params['ca_id'], 'ca_id2': params['ca_id2'], 'ca_id3' : params['ca_id3'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;

            if (resultItem.result === 'Y' && arrItems) {
                setWorkViewContent(arrItems[0]);
                setWorkVoiceActor(arrItems[0]['voice']);
                setWorkKeyword(arrItems[0]['keyword_name']);
                setWorkCategory(arrItems[0]['yoil']);
                setWorkCommentList(arrItems[0]['comments_list'])
            }    
        });
    }


  
    const [voiceActorData, setVoiceActorData] = useState([]);//성우정보 받아오기

    const WorkVoiceView = async () => {
        Api.send('work_voice', {  'wr_id_voice' : workViewContent['wr_2'], 'voice_is_char': workViewContent['wr_2_voice'] }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;

            if (resultItem.result === 'Y' && arrItems) {
             // console.log(arrItems);
              setVoiceActorData(arrItems);
            }    
        });
    }


    const [workPlayList, setWorkPlayList] = useState([]);

    const WorkPlayList = async () => {
        Api.send('work_list', { 'idx' : workViewContent['wr_9'], 'mb_id': mb_ids}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;

            if (resultItem.result === 'Y' && arrItems) {
              
              setWorkPlayList(arrItems);
              //setVoiceActorData(arrItems);
            }    
        });
    }


    
    const [playerVisible, setPlayerVisible] = useState(false);

    const [playerCheck, setPlayerCheck] = useState([]);
    const [selectHoop, setSelectHoop] = useState(0);

    const workPlayHandler= () => {
        setPlayerVisible(true);
    }

    const workPlayListAdd = (a, b) => {
        
        let wrId = parseInt(a); // 정수화
        let price = parseInt(b);
       
        if(!playerCheck.includes(wrId)){ // 클릭한 값이 배열에 저장되어 있지 않다면..
            setPlayerCheck([...playerCheck, wrId]);
        }else{ // 클릭한 값이 배열에 저장되어 있으면 제거
            const newPlayerCheck = playerCheck.filter(a => parseInt(a) !== wrId );
            setPlayerCheck(newPlayerCheck);
        }

        if(!playerCheck.includes(wrId)){ // 클릭한 값이 배열에 저장되어 있지 않다면..
            setSelectHoop(selectHoop+price);
        }else{
            setSelectHoop(selectHoop-price);

       
        }
       
      
    }

    //console.log(selectHoop);

    let workPlayListSize = workPlayList.length;

    const workPlayListDatas = workPlayList.map((work, index)=>{
        return(
            <TouchableOpacity key={index} onPress={ ()=> { (work['buyNo'] || work['wr_2'] == 0) ? workPlayHandler() : workPlayListAdd(work['wr_id'], work['wr_2']) }} style={{borderBottomWidth:1, borderBottomColor:'#e3e3e3', backgroundColor: (work['buyNo'] || work['wr_2'] == 0) ? '#f4f4f4' : '#fff'}}>
                <View style={{padding:15, backgroundColor: playerCheck.includes(parseInt(work['wr_id'])) ? '#fcebf4' : 'transparent'  }}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center' }}>
                            {
                               (work['buyNo'] || work['wr_2'] == 0) ?
                                <View style={{width:40, height:40, marginRight:15}}>
                                    <Image source={{uri:workViewContent['thumb']}} style={{width:40, height:40, borderRadius:10, marginRight:15}} />
                                    <View style={{backgroundColor:'rgba(0,0,0,0.5)', position:'absolute', top:0, left:0, width:'100%', height:'100%', justifyContent:'center', alignItems:"center"}}>
                                        <Image source={require('../images/tri_icons.png')} />
                                    </View>
                                </View>
                                :
                                <View style={{width:40, height:40, marginRight:15}}>
                                    <Image source={{uri:workViewContent['thumb']}} style={{width:40, height:40, borderRadius:10, marginRight:15}} />
                                </View>
                            }
                            
                            <View style={{justifyContent:'space-between'}}>
                                <DefaultText texts={work['wr_subject']} style={[{marginBottom:10}]}/>
                                <DefaultText texts={work['wr_6a'] + ":" + work['wr_6b']} style={[styled.colorGray]} />
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../images/coin_icon.png')} style={{marginRight:10}} />
                            {
                                (work['buyNo'] || work['wr_2'] == 0) ?
                                <DefaultText texts='구매완료' />
                                :
                                <DefaultText texts={work['wr_2']+'후프'} style={[styled.colorPink]} />
                            }
                            
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    })


    //console.log(workCategory);

    useEffect(()=>{
        WorkView(); // 작품상세 전체
        
        
    },[]);

    useEffect(()=>{
        WorkPlayList();
    },[workViewContent])
 

    //성우명
    const voiceName = workVoiceActor.map((voice, index)=>{
        return(
            <View key={index} style={{flexDirection:'row'}}>
                 <Text>
                {
                    index === 0 ? '':', '
                }
                </Text>
                <TouchableOpacity >
                    <DefaultText texts={voice} />
                </TouchableOpacity>
            </View>
        )
    });

    //키워드명
    const workKeywordNmae = workKeyword.map((keyword, index)=>{
        return(
            <View key={index} style={{flexDirection:'row'}}>
                <TouchableOpacity >
                    <DefaultText texts={'#'+keyword+' '} style={[styled.colorPink]}/>
                </TouchableOpacity>
            </View>
            
        )
    })


    

    const voiceListData = voiceActorData.map((item, index)=>{
        return(
            <View key={index} style={{marginTop:20}}>
                <TouchableOpacity  onPress={()=>{navigation.navigate('VoiceView', item)}}>
                    <Image source={{uri:item['thumb']}} style={{width:slideWidth, height:slideWidth}} />
                    <View style={{marginTop:20}}>
                        <DefaultText texts={item['wr_subject']} />
                        <DefaultText texts={item['char']} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    })


    //작업추가


    const [category, setCategory] = useState(1);


    useEffect(()=>{


        WorkVoiceView();
    },[category]);


    //댓글 입력
    const [commentInput, setCommentInput] = useState('');
    const [commentBtn, setCommentBtn] = useState('');

    const [workSelect, setWorkSelect] = useState(false);
   

    const workSelectList = [];
    
    const onShare = async (a) => {
        try {
          const result = await Share.share({
            message:
              a,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    const workSelectHandler = (a) => {
        setWorkSelect(!workSelect);
       
       
    }

    const [wishCount, setWishCount] = useState(1200);

    const wishBtnHandler = () => {
        ToastAndroid.show( params.title + " 작품를 구독합니다.", ToastAndroid.SHORT);
        setWishCount(wishCount+1);
    }
    

    const workCommentListSize = workCommentList.length;

    const workCommentListData = workCommentList.map((workItem, index)=>{
        return(
            <View key={index} style={{borderTopWidth:1,borderTopColor:'#e3e3e3'}}>
                <View style={{padding:20, position:'relative'}}>
                    <DefaultText texts={workItem['wr_name']} style={[styled.notoBold, styled.fontsize03, {marginBottom:15}]} />
                    <DefaultText texts={workItem['wr_content']} />

                    <View style={{position:'absolute', top:20, right:20}}>
                        <TouchableOpacity style={{paddingVertical:5, paddingHorizontal:10, backgroundColor:'#ff53ad'}} onPress={()=>{setCommentBtn('')}}>
                            <DefaultText texts="삭제" style={{color:'#fff'}} />
                        </TouchableOpacity>
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
                    <SectionTitle titles={workViewContent['wr_subject']} textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <Content>
                <View>
                    <View>
                        <Image source={{uri:workViewContent['thumb']}} style={{width:'100%', height:435}} />
                    </View>
                    <View style={[styles.itemViewWrap]}>
                        <SectionTitle titles={workViewContent['wr_subject']} fontSize={{fontSize:17}}/>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:10, marginBottom:10}}>
                            <DefaultText texts={workViewContent['wr_1']} style={{color:'#666'}} />
                            <View style={{width:1, height:15, backgroundColor:'#999', marginHorizontal:20}}></View>
                            <DefaultText texts="총 1화 30분" style={{color:'#666'}} />
                            <View style={{width:1, height:15, backgroundColor:'#999', marginHorizontal:20}}></View>
                            <DefaultText texts={workCategory+' 연재중'} style={{color:'#666'}} />
                        </View>
                        <View style={{flexDirection:'row'}}>
                            {voiceName}
                        </View>
                        <View style={{marginTop:10, flexDirection:'row', flexWrap:'wrap'}}>
                            {workKeywordNmae}
                        </View>
                        <View style={{marginTop:10}}>
                            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={require('../images/link_icon.png')} style={{marginRight:10}} />
                                
                                <DefaultText texts="메이킹 필름 시청하기" />
                                
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemViewBtnWrap}>
                            <TouchableOpacity style={styles.itemViewBtn} onPress={()=>{ wishBtnHandler() }}>
                                <Image source={require('../images/work_view_wish_icon.png')} style={{marginRight:10}} />
                                <DefaultText texts={numberFormat(parseInt(workViewContent['wr_good']))} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemViewBtn}>
                                <Image source={require('../images/comment_icon.png')} style={{marginRight:10}} />
                                <DefaultText texts={numberFormat(0)} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> onShare('https://cnj04.cafe24.com')}>
                                <Image source={require('../images/share_ico.png')} />
                              
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{marginTop:30}}>
                        <View style={styles.categoryWrap}>
                            <PageTabList title="에피소드" tabOn={category === 1} onPress={() => setCategory(1)} buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:17}} />
                            <PageTabList title="작품정보" tabOn={category === 2} onPress={() => setCategory(2)} buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:17}} />
                            <PageTabList title="감상평" tabOn={category === 3} onPress={() => setCategory(3)} buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:17}} />
                        </View>
                        <View>
                            {
                                category === 1 &&
                                <>
                                    <View style={[styled.containerPadding, {paddingVertical:20, borderTopWidth:1, borderBottomWidth:1, borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', flexDirection:'row', justifyContent:'space-between'}]}>
                                        <TouchableOpacity>
                                            <DefaultText texts="최신순" />
                                        </TouchableOpacity>

                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginRight:20}} onPress={()=>{setWorkSelect(false)}}>
                                                <DefaultText texts="선택해제" />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <DefaultText texts="전체 재생목록 추가" style={[styled.colorPink]} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* 작품리스트 부분 */}
                                    <View>
                                        {
                                            workPlayListSize > 0 
                                            ?
                                            workPlayListDatas
                                            :
                                            <View style={{justifyContent:'center', alignItems:'center',paddingVertical:30}}>
                                                <DefaultText texts="등록된 목록이 없습니다." />
                                            </View>
                                        }
                                    </View>
                                    

                                </>
                            }
                            {
                                category === 2 &&
                                <View style={[styled.containerPadding, {paddingVertical:40, borderTopWidth:1, borderTopColor:'#e3e3e3'}]}>
                                    <View style={{marginBottom:40}}>
                                        <DefaultText texts="작가" style={[styled.notoBold, {marginBottom:20}]} />
                                        <DefaultText texts={workViewContent['wr_1']} />
                                    </View>
                                    <View style={{marginBottom:40}}>
                                        <DefaultText texts="작품정보" style={[styled.notoBold, {marginBottom:20}]} />
                                        {
                                            workViewContent['wr_content'] ?
                                            <HTML source={{html:workViewContent['wr_content']}} tagsStyles={StyleHtml} />
                                            :
                                            <DefaultText texts="작품정보가 없습니다." />
                                        }
                                    </View>
                                    <View style={{marginBottom:40}}>
                                        <DefaultText texts="성우정보" style={[styled.notoBold]} />

                                        
                                        <View style={{flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
                                           {voiceListData}
                                        </View>
                                    </View>
                                    <View>
                                        <DefaultText texts="작품 Teaser" style={[styled.notoBold, {marginBottom:20}]} />
                                        <View style={[styled.containerPadding, {flexWrap:'wrap', flexDirection:'row', justifyContent:'center', paddingVertical:40}]}>
                                            <Text style={[{textAlign:'center', lineHeight:20}, styled.notoRegular]}>등록된 티저영상이 없습니다.</Text>
                                        </View>    
                                    </View>
                                </View>
                            }
                            {
                                category === 3 &&
                                <View style={[styled.containerPadding, {paddingVertical:40, borderTopWidth:1, borderTopColor:'#e3e3e3'}]}>
                                   <Inputs 
                                        placeholder="감상평을 입력하세요."
                                        multiline={true}
                                        styleInput={{height:80, textAlignVertical:"top"}}
                                        value = {commentInput}
                                        onChangeText = {setCommentInput}    
                                    />
                                    <DefaultButton buttonTitle="등록" buttonStyle={{marginTop:20}} onPress={()=>{setCommentBtn(commentInput); setCommentInput(''); }}/>

                                    <View style={{marginTop:30}}>
                                        
                                        <View>
                                            <>
                                                
                                               {
                                                   workCommentListSize > 0 ?
                                                   <>
                                                        <Text style={[styled.notoRegular, styled.lineHeight, styled.fontsize00, {marginBottom:10}]}>
                                                            총 
                                                            <Text style={[styled.colorPink]}> {workCommentListSize}</Text>건
                                                        </Text>
                                                        {workCommentListData}
                                                    </>
                                                    :
                                                    <View style={{justifyContent:'center', alignItems:'center', marginBottom:40}}>
                                                        <DefaultText texts="등록된 감상평이 없습니다." />
                                                    </View>
                                               }
                                            </>
                                        </View>
                                    </View>
                                </View>
                            }
                            
                        </View>
                    </View>
                </View>
                <Footer navigation={navigation} />


                
            </Content>
            
            {
                category === 1 && 
                <View>
                    <View style={{flexDirection:'row', paddingVertical:20, paddingHorizontal:25, backgroundColor:'#333', justifyContent:'space-between'}}>
                        <DefaultText texts={playerCheck.length > 0 ? '총 '+ playerCheck.length +'화 선택됨' : '총 0화 선택됨'} style={{color:'#ff53ad'}} />
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../images/coin_icon.png')} style={{marginRight:10}} />
                            <DefaultText texts={selectHoop+'후프'} style={[styled.colorPink]} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{height:60, backgroundColor:'#ff53ad', justifyContent:'center', alignItems:'center', width:'20%', borderRightWidth:1, borderRightColor:'#333'}} activeOpacity={0.9}>
                            <Image source={require('../images/sell_gift_icon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:60, backgroundColor:'#ff53ad', justifyContent:'center', alignItems:'center', width:'40%', borderRightWidth:1, borderRightColor:'#333'}} activeOpacity={0.9}>
                            <SectionTitle titles="마이리스트 담기" textstyle={{color:'#fff'}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:60, backgroundColor:'#ff53ad', justifyContent:'center', alignItems:'center', width:'40%'}} activeOpacity={0.9}>
                            <SectionTitle titles="구매하기" textstyle={{color:'#fff'}} />
                        </TouchableOpacity>
                    </View>
                </View>
            }

            <Modal
                animationType='fade'
                visible={playerVisible}
            >
                <View style={{position:'absolute', right:20, top:30, zIndex:999}}>
                    <TouchableOpacity onPress={()=>{setPlayerVisible(false)}}>
                        <Image source={require('../images/close_white.png')} />
                    </TouchableOpacity>
                </View>
                <Player modalClose={false} />
            </Modal>
            
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    itemViewWrap : {
        paddingTop:30,
        paddingHorizontal:20,
        paddingBottom:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    itemViewBtnWrap: {
        flexDirection:'row',
        alignItems:'center',
        
        marginTop:20
    },
    itemViewBtn:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:20
    },
    categoryWrap: {
        flexDirection: 'row'
    }
})

export default connect(
({ User }) => ({
    userInfo: User.userInfo, //회원정보
}),
(dispatch) => ({
    member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
    // member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
    
})
)(ItemView);
