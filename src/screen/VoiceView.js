import { Content } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SectionTitle, DefaultText, Inputs, DefaultButton} from '../components/BOOTSTRAP';
import { numberFormat } from '../dummydata';
import styled from '../style/style';
import PageTabList from '../components/PageTabList';
import StyleHtml from '../style/StyleHtml';
import HTML from 'react-native-render-html';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const VoiceImgSize = screenWidth;


const VoiceView = (props) => {


    const {navigation, route} = props;
    //console.log('성우 뷰: ',props.route.params);

    const params = props.route.params;

    const [ voiceCategory, setVoiceCategory ] = useState(1);

      //댓글 입력
      const [commentInput, setCommentInput] = useState('');
      const [commentBtn, setCommentBtn] = useState('');


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
            <Content style={{flexWrap:'wrap', flex:1}}>
                <View style={styles.voiceViewTop}>
                    <DefaultText texts="성우정보" style={[{color:'#fff'}]} />
                    <TouchableOpacity style={styles.voiceCloseBtn} onPress={()=>{navigation.goBack()}}>
                        <DefaultText texts="닫기" />
                    </TouchableOpacity>
                </View>
                <View style={styles.voiceContentBox}>
                    <Image source={{uri:params.thumb}} style={{width:VoiceImgSize, height: VoiceImgSize}} />


                    <View style={styles.voiceContentInfoBox}>
                        <View>
                            <DefaultText texts={params.wr_subject} style={{color:'#fff'}} />
                            <DefaultText texts={params.wr_1} style={{color:'#fff', marginTop:15}} />
                        </View>
                        <View style={{alignItems:'flex-end', marginTop:30}}>
                            <View style={styles.voiceBtnWrap}>
                                <View style={[styles.voiceBtns, {marginRight:15}]}>
                                    <Image source={require('../images/work_view_wish_icon.png')} style={{marginRight:10}} />
                                    <DefaultText texts={numberFormat(params.wr_good)} style={{color:'#fff'}} />
                                </View>
                                <View style={styles.voiceBtns}>
                                    <Image source={require('../images/comment_icon_w.png')} style={{marginRight:10}} />
                                    <DefaultText texts={numberFormat(20)} style={{color:'#fff'}} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.voiceSubscribeBtn}>
                        <TouchableOpacity style={{backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:5, borderRadius:5}}>
                            <DefaultText texts="구독" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.categoryWrap}>
                        <PageTabList title="프로필" tabOn={voiceCategory === 1} onPress={() => setVoiceCategory(1)} buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}}
                         btnTextStyle={{fontSize:17, paddingTop:10}} />
                        <PageTabList title="참여작품" tabOn={voiceCategory === 2} onPress={() => setVoiceCategory(2)}   buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:17, paddingTop:10}} />
                        <PageTabList title="댓글" tabOn={voiceCategory === 3} onPress={() => setVoiceCategory(3)}  buttonStyle={{width:'33%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:17 ,paddingTop:10}} />
                    </View>
                    <View style={[styled.containerPadding, {paddingVertical:20}]}>
                        {
                            voiceCategory === 1 && 
                            <View>
                                <HTML html={params.wr_content} tagsStyles={StyleHtml} />
                            </View>
                        }
                        {
                            voiceCategory === 2 && <View><Text>참여작품</Text></View>
                        }
                        {
                            voiceCategory === 3 && 
                            <View>
                                <Inputs 
                                    placeholder="감상평을 입력하세요."
                                    multiline={true}
                                    styleInput={{height:80, textAlignVertical:"top"}}
                                    value = {commentInput}
                                    onChangeText = {setCommentInput}    
                                />
                                <DefaultButton buttonTitle="등록" buttonStyle={{marginTop:20}} onPress={()=>{setCommentBtn(commentInput); setCommentInput(''); }}/>

                                <View>
                                    {
                                        commentBtn ? 
                                        <>
                                            
                                            <View style={{borderTopWidth:1,borderTopColor:'#e3e3e3'}}>
                                                <View style={{padding:20, position:'relative'}}>
                                                    <DefaultText texts={"테스터"} style={[styled.notoBold, styled.fontsize03, {marginBottom:15}]} />
                                                    <DefaultText texts={commentBtn} />

                                                    <View style={{position:'absolute', top:20, right:20}}>
                                                        <TouchableOpacity style={{paddingVertical:5, paddingHorizontal:10, backgroundColor:'#ff53ad'}} onPress={()=>{setCommentBtn('')}}>
                                                            <DefaultText texts="삭제" style={{color:'#fff'}} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                        :
                                        <>
                                            
                                            <View style={[styled.containerPadding, {flexWrap:'wrap', flexDirection:'row', justifyContent:'center', paddingVertical:40}]}>
                                                <Text style={[{textAlign:'center', lineHeight:20}, styled.notoRegular]}>등록된 감상평이 없습니다.</Text>
                                            </View>
                                        </>
                                    }
                                    
                                </View>
                               
                            </View>
                        }
                    </View>
                </View>
            </Content>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    voiceViewTop:{
        paddingHorizontal:20,
        height:50,
        backgroundColor:'#333',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
        
    },
    voiceCloseBtn: {
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderRadius:5,
    },
    voiceContentBox: {
        position:'relative'
    },
    voiceContentInfoBox : {
        position: 'absolute',
        bottom:0,
        zIndex:10,
        backgroundColor:'rgba(0,0,0,0.4)',
        width:'100%',
        padding:20,
    },


    voiceBtnWrap: {
        flexDirection:'row',
        alignItems:'center'
    },
    voiceBtns: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    voiceSubscribeBtn: {
        position: 'absolute',
        top:20,
        right:20
    },
    categoryWrap: {
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3'
    }
})

export default VoiceView;