import React, {useState, useEffect} from 'react';
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from './BOOTSTRAP';
import { myCommentList, myVoiceCmtList, myEventCmtList, hooplist } from '../dummydata';
import styled from '../style/style';
import PageTabList from '../components/PageTabList'
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';

import Api from '../Api';

const MyPageContent = (props) => {

    //console.log("라우트 출력: ",route);
    
    const {navigation, route, member_login } = props;

    const [category, setCategory] = useState(route);
    
   

    const [commentCategory, setCommentCategory] = useState(1);
    const [commentDummy, setCommentDummy] = useState(myCommentList);

    const [commentList, setCommentList] = useState([]);


   const userInfos = props.userInfo;

   //console.log('회원정보', userInfos);
   

    
    const MyCommentList = async () => {
        Api.send('member_comment', {'id': userInfos['mb_id'], 'category':commentCategory }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                console.log('댓글 출력 결과', resultItem);
                //console.log('댓글 결과', arrItems);
                setCommentList(arrItems);
               //setMainSlide(arrItems);
            }    
        });
    }



   useEffect(()=>{
      MyCommentList();

   },[commentCategory])




    let countCmtData = commentList.length; //댓글 목록 카운트

  
    const myCommentData = commentList.map((cmt, index)=>{ // 댓글 목록 데이터
        
        return(
            <View key={index} style={[{borderTopWidth:1, borderTopColor:'#e3e3e3', marginTop:(index===0 ? null : 30 )}]}>
                <View style={styles.commentTitleBox}>
                    <DefaultText texts={cmt.wr_subject} style={[{fontSize:16}, styled.notoMedium]} />

                </View>
                <View style={styles.commentContentBox}>
                    <DefaultText texts={cmt.wr_content} style={[{marginBottom:10}, styled.notoMedium]} />
                    <DefaultText texts={cmt.wr_datetime} style={[{color:'#999'}]} />
                </View>
            </View>
        )
    })


    let countHoop = hooplist.length;

    const hooplistdata = hooplist.map((hoop, index)=>{
        return (
            <View style={styles.coinListTbody} key={index}>
                <View style={styles.coinListTd}>
                    <DefaultText texts={hoop.type} /> 
                </View>
                <View style={[styles.coinListTd, {flex:2}]}>
                    <DefaultText texts={hoop.dates} />
                </View>
                <View style={styles.coinListTd}>
                    <DefaultText texts={hoop.hoops} style={{color:'#ff53ad'}} />
                    <DefaultText texts={'('+hoop.addHoops+')'} />
                </View>
            </View>
        )
    })

    const Mypage = () => {
        return(
            <View>
                <View style={{alignItems:'flex-end'}}>
                    <View style={styles.memberBtnWrap}>
                        <TouchableOpacity style={[styles.memberBtn, {marginRight:10}]}>
                            <DefaultText texts="회원정보수정" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.memberBtn}>
                            <DefaultText texts="회원탈퇴" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.memberInfoTable}>
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="id" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            <DefaultText texts={userInfos.mb_id} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="이메일" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            <DefaultText texts={userInfos.mb_email} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="닉네임" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            <DefaultText texts={userInfos.mb_nick} />
                        </View>
                    </View>
                    
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="생년월일" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            {
                                userInfos.mb_birth ?
                                <DefaultText texts={userInfos.mb_nick} />
                                :
                                <DefaultText texts="정보없음" />
                            }
                        
                        </View>
                    </View>
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="성인인증" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            {
                                userInfos.mb_adult == 1 ?
                                <DefaultText texts="예" />
                                :
                                <DefaultText texts="아니오" />
                            }
                        
                        </View>
                    </View>
                    <View>
                        <View style={styles.memberInfoTop}>
                            <DefaultText texts="프로모션 수신에 동의" style={styled.notoBold} />
                        </View>
                        <View style={styles.memberInfoBotom}>
                            {
                                userInfos.mb_mailling == 1 ?
                                <DefaultText texts="예" />
                                :
                                <DefaultText texts="아니오" />
                            }
                        
                        </View>
                    </View>   
                </View>
            </View>
        )
    }

    const MyComment = () => {
        return(
            <View>
                <View style={styles.commentBtnWrap}>
                    <TouchableOpacity onPress={()=>{setCommentCategory(1)}}>
                        <DefaultText texts="작품" style={{color : (commentCategory === 1 && '#ff53ad')}} />
                    </TouchableOpacity>
                    <View style={{width:1, height:15, backgroundColor:'#999', marginHorizontal:20}}></View>
                    <TouchableOpacity onPress={()=>{setCommentCategory(2)}}>
                        <DefaultText texts="성우" style={{color : (commentCategory === 2 && '#ff53ad')}} />
                    </TouchableOpacity>
                    <View style={{width:1, height:15, backgroundColor:'#999', marginHorizontal:20}}></View>
                    <TouchableOpacity onPress={()=>{setCommentCategory(3)}}>
                        <DefaultText texts="이벤트" style={{color : (commentCategory === 3 && '#ff53ad')}} />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:40}}>
                    {
                        countCmtData > 0
                        ?
                        <>
                            <Text style={[{fontSize: 15, lineHeight : 22, color:'#333', marginBottom:20}, styles.notoRegular]}>총 <Text style={{color:'#ff53ad'}}>{countCmtData}</Text>건의 댓글을 등록하셨습니다.</Text>
                            <View>{myCommentData}</View>
                        </>
                        :
                        <>
                            <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                                <DefaultText texts="등록된 댓글이 없습니다." style={{color:'#999'}} />
                            </View>
                        </>
                    }
                    
                    
                </View>
            </View>
        )
    }

    const CoinList = () => {
        return(
            <View style={styles.coinListTable}>
                <View style={styles.coinListThead}>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="구분" />
                    </View>
                    <View style={[styles.coinListTh, {flex:2}]}>
                        <DefaultText texts="충전일자" />
                    </View>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="후프" style={{color:'#ff53ad'}} />
                        <DefaultText texts="(당근)" />
                    </View>
                </View>
                {
                    countHoop > 0
                    ?
                    <View>
                        {hooplistdata}
                    </View>
                    :
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="후프충전내역이 없습니다." style={{color:'#999'}} />
                    </View>
                }
                
            </View>
        )
    }

    return (
        <View>
            <View style={styles.Category}>
                <PageTabList title="내정보" buttonStyle={{marginRight:15}} tabOn={category === 1} onPress={() => setCategory(1)} />
                <PageTabList title="내 댓글" buttonStyle={{marginRight:15}} tabOn={category === 2} onPress={() => setCategory(2)} />    
                <PageTabList title="후프충전내역" tabOn={category === 3} onPress={() => setCategory(3)} />    
            </View>

            <View>
                {
                    category === 1 && <Mypage />
                }
                {
                    category === 2 && <MyComment />
                }
                {
                    category === 3 && <CoinList />
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
    memberBtnWrap: {
        flexDirection:'row'
    },  
    memberBtn: {
        paddingHorizontal:7,
        paddingVertical:10,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#bababa'
    },
    memberInfoTable:{
        marginTop:20,
        borderTopWidth:2,
        borderTopColor:'#333'
    },
    memberInfoTop:{
        padding:10,
        backgroundColor:'#f4f4f4',
        borderWidth:1,
        borderTopWidth:0,
        borderColor:'#e3e3e3'
    },
    memberInfoBotom:{
        padding:10,
        backgroundColor:'#fff',
        borderWidth:1,
        borderTopWidth:0,
        borderColor:'#e3e3e3'
    },
    commentBtnWrap:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    commentTitleBox:{
        paddingVertical:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f4f4f4',
        borderWidth:1,
        borderColor:'#e3e3e3',
        borderTopWidth:0
    },
    commentContentBox:{
        padding:20,
        borderWidth:1,
        borderColor:'#e3e3e3',
        borderTopWidth:0
    },

    coinListTable: {
        width: '100%',
        borderTopWidth:1,
        borderTopColor:'#333'
    },
    coinListThead: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    coinListTh: {
        paddingVertical:15,
        backgroundColor:'#f4f4f4',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    coinListTbody: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    coinListTd:{
        paddingVertical:15,
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3'
    }

});

export default connect(
    ({ User }) => ({
        userInfo: User.userInfo, //회원정보
    }),
    (dispatch) => ({
        member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
        member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
        
    })
)(MyPageContent);