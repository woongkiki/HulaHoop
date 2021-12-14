import React, {useState, useEffect} from 'react';
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, ToastAndroid, Alert, TextInput } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, Inputs, SectionTitle, RadioBtn } from './BOOTSTRAP';
import { textLengthOverCut, itemingCatergory, numberFormat, MyQaLData} from '../dummydata';
import styled from '../style/style';
import PageTabList from '../components/PageTabList';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';
import Api from '../Api';
import StyleHtml from '../style/StyleHtml';
import HTML from 'react-native-render-html';

const CustomerContent = (props) => {

    const {navigation, member_login} = props;

    //console.log(props);
    const userInfos = props.userInfo;

    //console.log('로그인정보 : ', userInfos)

    const [category, setCategory] = useState(1);

    const [noticeApi, setNoticeApi] = useState([]);

    const NoticeApiData = async () => {
        Api.send('board_notice', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

                //console.log(arrItems);
                setNoticeApi(arrItems);
            }    
        });
    }

    useEffect(()=>{
        NoticeApiData();
    },[]);


    const NoticeDataCnt = noticeApi.length;

    const NoticeDataList = noticeApi.map((item, index)=>{
        return(
            <View style={styles.coinListTbody} key={index}>
                <View style={styles.coinListTd}>
                    <DefaultText texts={item.wr_num * -1} /> 
                </View>
                <View style={[styles.coinListTd, {flex:2, alignItems:'flex-start'}]}>
                    <TouchableOpacity onPress={()=>{ navigation.navigate("NoticeView", item) }}>
                        <DefaultText texts={item.wr_subject} />
                    </TouchableOpacity>
                </View>
                <View style={styles.coinListTd}>
                    <DefaultText texts={item.wr_datetime2} />
                    
                </View>
            </View>
        )
    })

    const Notice = ({navigation}) => {
        return(
            <View style={styles.coinListTable}>
                <View style={styles.coinListThead}>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="번호" />
                    </View>
                    <View style={[styles.coinListTh, {flex:2}]}>
                        <DefaultText texts="제목" />
                    </View>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="작성일"/>
                    </View>
                </View>
                {
                    NoticeDataCnt > 0
                    ?
                    <View>
                        {NoticeDataList}
                    </View>
                    :
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="등록된 게시물이 없습니다." style={{color:'#999'}} />
                    </View>
                }
                
            </View>
        )
    }


    const [faqAnShow, setFaqAnShow] = useState(false);
    const [faqDataView, setFaqDataView] = useState([]);

    const FaqApiData = async () => {
        Api.send('board_faq', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

                //console.log('faq 결과:', resultItem);
                //console.log('faq 데이터:', arrItems);
                setFaqDataView(arrItems);
                //setNoticeApi(arrItems);
            }    
        });
    }

    useEffect(()=>{

        if(category==2){
            FaqApiData();
        }

    },[category]);

    //console.log('faq 데이터리스트 : ',faqDataView);

    const [faqOn, setFaqOn] = useState('');
    

    const faqShowBtn = index => {

        setFaqOn(index);
       // console.log('faqOn Value : ', faqOn);
        //console.log(index);
    }

    const faqDataLists = faqDataView.map((item, index)=>{
        return(
            <View key={index}>
                <TouchableOpacity style={styles.faqQu} onPress={ () => {faqShowBtn(item['wr_id'])} }>
                    <View style={styles.faqQuTitle}>
                        <Image source={require('../images/qa_q_img.png')} style={{width:40, height:40, marginRight:17}} />
                        <DefaultText texts={textLengthOverCut(item['wr_subject'],17)} />
                    </View>
                    <View>
                        <Image source={require('../images/down_img.png')} style={{width:26, height:15}} />
                    </View>
                </TouchableOpacity>
                {
                    faqOn === item['wr_id'] ? 
                    <View style={styles.faqAn}>
                        <HTML html={item['wr_content'] ? item['wr_content'] : '<p></p>'} tagsStyles={StyleHtml} />
                    </View>
                    :
                    null
                }
               
            </View>
        )
    })

    //FAQ
    const Faq = () => {
        return(
            <View>
                {faqDataLists}
            </View>
        )
    }

    
    
    //console.log('문의내용', contentInput);

    //1:1문의
    const CustomerCenters = () => {


        //사용기기 os 선택
        const [radioBtn, setRadioBtn] = useState(1);

        //사용기기 값 입력
        const [deviceInput, setDeviceInput] = useState('');
        const _deviceInputChange = text => {
            setDeviceInput(text);
        }

        //문의유형 선택
        const [typeRadio, setTypeRadio] = useState(1);

        //제목 입력
        const [titleInput, setTitleInput] = useState('');
        const _deviceTitleChange = text => {
            setTitleInput(text);
        }

        //내용 입력
        const [contentInput, setContentInput] = useState('');
        const _handleContentChange = text => {
            setContentInput(text);
        }

        const oneQaSubmitBtn = async()=>{

            //Alert.alert('dd');

            if(!radioBtn){
                ToastAndroid.show('사용기기를 선택하세요.', ToastAndroid.SHORT);
                return false;
            }else if(!deviceInput){
                ToastAndroid.show('사용기기명을 입력하세요.', ToastAndroid.SHORT);
                return false;
            }else if(!typeRadio){
                ToastAndroid.show('문의유형을 선택하세요.', ToastAndroid.SHORT);
                return false;
            }else if(!titleInput){
                ToastAndroid.show('제목을 입력하세요.', ToastAndroid.SHORT);
                return false;
            }else if(!contentInput){
                ToastAndroid.show('내용을 입력하세요.', ToastAndroid.SHORT);
                return false;
            }


            Api.send('customer_qa', {'id': userInfos['mb_id'], 'deviceOs' : radioBtn, 'deviceName': deviceInput, 'qatype':typeRadio , 'titles': titleInput, 'contents': contentInput }, (args)=>{ 
                let resultItem = args.resultItem;
                let arrItems = args.arrItems;
                if (resultItem.result === 'Y' && arrItems) {
                    
                    ToastAndroid.show(resultItem.message, ToastAndroid.SHORT);
                    setDeviceInput('');
                    setTitleInput('');
                    setContentInput('');
                }else{
                    ToastAndroid.show(resultItem.message, ToastAndroid.SHORT);
                }
            });

        }

        return (
            <>
            <View style={{borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={styles.memberInfoTop} >
                    <DefaultText texts="사용기기" style={styled.notoBold} />
                </View>
                <View style={styles.memberInfoBotom}>
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <RadioBtn RadioTitle="웹 브라우저" onPress={()=>{setRadioBtn(1)}} radioBtn={radioBtn === 1 ? true : false}/>
                        <RadioBtn RadioTitle="안드로이드" onPress={()=>{setRadioBtn(2)}} radioBtn={radioBtn == 2 ? true : false}/>

                        <RadioBtn RadioTitle="아이폰" onPress={()=>{setRadioBtn(3)}} radioBtn={radioBtn === 3 ? true : false}/>
                    </View>
                    <View>
                        <Inputs placeholder="운영체제(OS)명, 사용 브라우저명과 버전" value={deviceInput} onChangeText={_deviceInputChange} />

                        <View style={{marginTop:10}}>
                        {
                            radioBtn === 1 &&
                            <Text style={[styled.fontsize00, styled.notoRegular, styled.lineHeight, {color:'#666'}]}>
                                운영체제(OS)명, 사용 브라우저명과 버전{'\n'}
                                예) 윈도우10, 익스플로러 11
                            </Text>
                        }
                        {
                            radioBtn === 2 &&
                            <Text style={[styled.fontsize00, styled.notoRegular, styled.lineHeight, {color:'#666'}]}>
                                OS 버전, 휴대폰 기종{'\n'}
                                예) 안드로이드 7.0(누가), 삼성 S9 또는 IOS 13,{'\n'}아이폰 8
                            </Text>
                        }
                        {
                            radioBtn === 3 &&
                            <Text style={[styled.fontsize00, styled.notoRegular, styled.lineHeight, {color:'#666'}]}>
                                OS 버전, 휴대폰 기종{'\n'}
                                예) 안드로이드 7.0(누가), 삼성 S9 또는 IOS 13,{'\n'}아이폰 8
                            </Text>
                        }
                        </View>
                        
                    </View>
                </View>
                <View style={styles.memberInfoTop} >
                    <DefaultText texts="문의유형" style={styled.notoBold}  />
                    
                </View>
                <View style={styles.memberInfoBotom}>
                    <View style={{flexDirection:'row', marginBottom:10, flexWrap:'wrap'}}>
                        <RadioBtn RadioTitle="로그인/계정" onPress={()=>{setTypeRadio(1)}} radioBtn={typeRadio === 1 ? true : false}/>
                        <RadioBtn RadioTitle="앱/PC" onPress={()=>{setTypeRadio(2)}} radioBtn={typeRadio === 2 ? true : false}/>

                        <RadioBtn RadioTitle="결제/환불" onPress={()=>{setTypeRadio(3)}} radioBtn={typeRadio === 3 ? true : false}/>
                        <RadioBtn RadioTitle="콘텐츠" onPress={()=>{setTypeRadio(4)}} radioBtn={typeRadio === 4 ? true : false}/>
                        <RadioBtn RadioTitle="아이폰" onPress={()=>{setTypeRadio(5)}} radioBtn={typeRadio === 5 ? true : false}/>

                    </View>
                    <Text style={[styled.fontsize00, styled.notoRegular, {color:'#666', lineHeight:20}]}>
                        ※ 문의유형을 선택해주세요.
                    </Text>
                </View>
                <View style={styles.memberInfoTop} >
                    <DefaultText texts="제목" style={styled.notoBold}/>
                    
                </View>
                <View style={styles.memberInfoBotom}>
                    <Inputs placeholder="문의하시려는 제목을 입력하세요" value={titleInput} onChangeText={_deviceTitleChange} />
                </View>

                <View style={styles.memberInfoTop} >
                    <DefaultText texts="내용" style={styled.notoBold} />
                    
                </View>
                <View style={styles.memberInfoBotom}>
                    <Inputs value={contentInput} onChangeText={_handleContentChange} placeholder="문의하시려는 내용을 입력하세요" multiline={true} styleInput={{height:150, textAlignVertical:"top"}} />
                </View>
                <View style={styles.memberInfoTop} >
                    <DefaultText texts="파일첨부" style={styled.notoBold} />
                    
                </View>
                <View style={styles.memberInfoBotom}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <View style={{width:'72%', height:50, backgroundColor:'#fff', borderWidth:1, borderColor:'#e3e3e3',justifyContent:'center', paddingLeft:10 }}>
                           <DefaultText texts="선택된 파일없음" style={{color:'#666'}} />
                       </View>
                       <TouchableOpacity style={{width:'25%', height:50, backgroundColor:'#333', justifyContent:'center', alignItems:'center'}}>
                          <DefaultText texts="파일첨부" style={{color:'#fff'}} /> 
                        </TouchableOpacity>
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                       <View style={{width:'72%', height:50, backgroundColor:'#fff', borderWidth:1, borderColor:'#e3e3e3',justifyContent:'center', paddingLeft:10 }}>
                           <DefaultText texts="선택된 파일없음" style={{color:'#666'}} />
                       </View>
                       <TouchableOpacity style={{width:'25%', height:50, backgroundColor:'#333', justifyContent:'center', alignItems:'center'}}>
                          <DefaultText texts="파일첨부" style={{color:'#fff'}} /> 
                        </TouchableOpacity>
                   </View>
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:30}}>
                <TouchableOpacity onPress={oneQaSubmitBtn} style={{paddingHorizontal:10,paddingVertical:7, backgroundColor:'#333', justifyContent:'center', alignItems:'center', borderRadius:5}}>
                    <DefaultText texts="작성완료" style={{color:'#fff'}} />
                </TouchableOpacity>
            </View>
            </>
        )
    }

    const MyQaLDataCnt = MyQaLData.length;

    const MyQaDataList = MyQaLData.map((item, index)=>{
        return(
            <View style={styles.coinListTbody} key={index}>
                <View style={styles.coinListTd}>
                    <DefaultText texts={item.type} /> 
                </View>
                <View style={[styles.coinListTd, {flex:2, alignItems:'flex-start'}]}>
                    <TouchableOpacity>
                        <DefaultText texts={item.title} />
                    </TouchableOpacity>
                </View>
                <View style={styles.coinListTd}>
                   <View style={{paddingVertical:5, paddingHorizontal:10, borderRadius:7 ,backgroundColor: ( item.answer == "답변대기" ? '#ff53ad' : '#333' )}}>
                       <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20, color:'#fff'}]}>{item.answer}</Text>
                   </View>
                    
                </View>
            </View>
        )
    })

    const CustomerCentersList = () => {


        const [myCustomerCenterList, setMyCustomerCenterList] = useState([]);



        const CustomerCenterDatas = async () => {
            Api.send('customer_qalist', {'id': userInfos['mb_id'] }, (args)=>{ 
                let resultItem = args.resultItem;
                let arrItems = args.arrItems;
                if (resultItem.result === 'Y' && arrItems) {
                   
                    
                    setMyCustomerCenterList(arrItems);

                   // console.log(resultItem);
                }else{
                    console.log(resultItem); // 실패
                }
            });
        }

        useEffect(()=>{

            if(category === 4){
                CustomerCenterDatas();
            }
        },[])


       console.log(myCustomerCenterList);

        const MyQaDatasLength = myCustomerCenterList.length;

        const MyQaDatas = myCustomerCenterList.map((item, index)=>{
            return(
                <View style={styles.coinListTbody} key={index}>
                    <View style={styles.coinListTd}>
                        <DefaultText texts={item.wr_3} /> 
                    </View>
                    <View style={[styles.coinListTd, {flex:2, alignItems:'flex-start'}]}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('MyQaView', item)}}>
                            <DefaultText texts={item.wr_subject} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.coinListTd}>
                    <View style={{paddingVertical:5, paddingHorizontal:10, borderRadius:7 ,backgroundColor: ( item.comment_status == "답변대기" ? '#ff53ad' : '#333' )}}>
                        <Text style={[styled.notoRegular, styled.fontsize00, {lineHeight:20, color:'#fff'}]}>{item.comment_status}</Text>
                    </View>
                        
                    </View>
                </View>
            )
        })
        

        return (
            <View style={styles.coinListTable}>
                <View style={styles.coinListThead}>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="질문유형" />
                    </View>
                    <View style={[styles.coinListTh, {flex:2}]}>
                        <DefaultText texts="제목" />
                    </View>
                    <View style={styles.coinListTh}>
                        <DefaultText texts="답변여부"/>
                    </View>
                </View>
                {
                    MyQaDatasLength > 0
                    ?
                    <View>
                        {MyQaDatas}
                    </View>
                    :
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="등록된 게시물이 없습니다." style={{color:'#999'}} />
                    </View>
                }
            </View>
        )
    }


    return (
        <View>
            <View style={styles.Category}>
                <PageTabList title="공지사항" buttonStyle={{marginRight:15}} tabOn={category === 1} onPress={() => setCategory(1)} />
                <PageTabList title="FAQ" buttonStyle={{marginRight:15}} tabOn={category === 2} onPress={() => setCategory(2)} />    
                <PageTabList title="1:1문의" buttonStyle={{marginRight:15}} tabOn={category === 3} onPress={() => { userInfos ? setCategory(3) : navigation.navigate('Login') }} />
                <PageTabList title="나의 문의내역" tabOn={category === 4} onPress={() => { userInfos ? setCategory(4) : navigation.navigate('Login') } } />
            </View>
            <View>
               
                {
                    category === 1 && <Notice />
                }
                {
                    category === 2 && <Faq />
                }
                {
                    category === 3 && <CustomerCenters />
                }
                {
                    category === 4 && <CustomerCentersList />
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
    },


    faqQu:{
        padding:20,
        backgroundColor:'#f6f6f6',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#e3e3e3'
    },
    faqQuTitle : {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    faqAn : {
       
        padding:20,
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3'
    },

    memberInfoTop:{
        padding:10,
        backgroundColor:'#f4f4f4',
        borderWidth:1,
        
        borderColor:'#e3e3e3'
    },
    memberInfoBotom:{
        padding:10,
        backgroundColor:'#fff',
 
    },
})

export default connect(
    ({ User }) => ({
        userInfo: User.userInfo, //회원정보
    }),
    (dispatch) => ({
        member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
        member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
        
    })
)(CustomerContent);