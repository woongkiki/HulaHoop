import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Alert, Dimensions, TouchableOpacity, ToastAndroid} from 'react-native';
import { SectionTitle, DefaultText, Inputs, DefaultButton } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '../style/style';
import { Content } from 'native-base';
import { numberFormat } from '../dummydata';
import PageTabList from '../components/PageTabList';
import Api from '../Api';
import StyleHtml from '../style/StyleHtml';
import HTML from 'react-native-render-html';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.2;

const ShopItemView = (props) => {

    const {navigation, route} = props;

    const params = route.params;

    console.log(params);

    const [shopCategory, setShopCategory] = useState(1);

    const [sellItemUseList, setItemUseList] = useState([]);

    const SellItemUseApi = async () => {
        Api.send('shop_itemUse', {'it_id':params.it_id}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                //console.log('결과 : ', resultItem);
                setItemUseList(arrItems);
            }    
        });
    }

   

    const [shopUseContent, setShopUseContent] = useState(''); //구매후기 버튼에 따라 해당하는 아이디값 저장

    const isUseContentBtn = (e) => {
        setShopUseContent(e);
    }


    const [sellItemQaList, setItemQaList] = useState([]);

    const SellItemQaApi = async () => {
        Api.send('shop_itemQa', {'it_id':params.it_id}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                //console.log('결과 : ', resultItem);
                setItemQaList(arrItems);
            }    
        });
    }

    const [sellItemQaId, setSellItemQaId] = useState('');
    const sellItemQaBtn = (e) => {
        setSellItemQaId(e);
    }


    useEffect(()=>{
        if(shopCategory==2){
            SellItemUseApi();
        }else if(shopCategory==3){
            SellItemQaApi();
        }
    },[shopCategory])

    //console.log(sellItemUseList);
    //console.log('구매문의 리스트 : ' ,sellItemQaList);

    const sellItemUseListSize = sellItemUseList.length;

    const sellItemUseLists = sellItemUseList.map((item, index)=>{
        return(
            <View key={index} style={index =! 0 ? {borderTopWidth:1, borderTopColor:'#e3e3e3'} : {borderTopWidth:0} }>
                <View style={{paddingVertical:15}}>

                    <View style={{paddingHorizontal:20}}>
                        <Image source={{uri: item.score}} style={{width:85, height:15}} />
                        <DefaultText texts={item.is_subject} style={[{marginTop:10, marginBottom:10}, styled.notoBold]} />
                        <View style={{flexDirection:'row'}}>
                            <DefaultText texts={item.is_name} style={{color:'#7f7f7f'}} />
                            <DefaultText texts="|" style={{marginLeft:5, marginRight:5, color:'#7f7f7f'}} />
                            <DefaultText texts={item.is_time} style={{color:'#7f7f7f'}} />
                        </View>
                        {
                            shopUseContent === item.is_id ?
                            <View style={{paddingVertical:20}}>
                                <HTML html={item['is_content'] ? item['is_content'] : '<p></p>'} tagsStyles={StyleHtml} />
                            </View>
                            :
                            null
                        }
                       
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{paddingVertical:8,paddingHorizontal:10, borderWidth:1, borderColor:'#ddd', borderRadius:5}} onPress={()=>{isUseContentBtn(item.is_id)}}>
                                <DefaultText texts="내용보기" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    });


    const sellItemQaListSize = sellItemQaList.length;

    const sellItemQaListData = sellItemQaList.map((item, index)=> {
        return(
            <View style={[{padding:10}, index==!0 ? {borderTopWidth:1, borderTopColor:'#e3e3e3'} : null]}>
                <TouchableOpacity onPress={()=>{sellItemQaBtn(item.iq_id)}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center', height:30}}>
                            <View style={{paddingHorizontal:8, backgroundColor:'#ccd1d9', color:'#fff', marginRight:10, height:30, justifyContent:'center', alignItems:'center', borderRadius:3}}>
                                <DefaultText texts="답변대기" style={[{fontSize:12, color:'#fff'}]} />
                            </View>
                            <View>
                                <DefaultText texts={item.iq_subject} style={[styled.notoBold]} />
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row', alignItems:'center', height:30}}>
                                <DefaultText texts={item.iq_name} style={{color:'#7f7f7f'}} />
                                <DefaultText texts="|" style={{color:'#7f7f7f', marginLeft:5, marginRight:5}}/>
                                <DefaultText texts={item.datetime2} style={{color:'#7f7f7f'}} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    sellItemQaId === item.iq_id ?
                    <View style={{marginTop:20}}>
                        <View>
                            <View style={{flexDirection:'row', paddingVertical:15, paddingHorizontal:15, backgroundColor:'#f3f3f3',alignItems:'center'}}>
                                <DefaultText texts="Q" style={{fontSize:30, lineHeight:35, marginRight:15}} />
                                
                                <HTML html={item['iq_question'] ? item['iq_question'] : '<p></p>'} tagsStyles={StyleHtml} />
                            
                            </View>
                        </View>
                        <View style={{marginTop:1}}>
                            <View style={{flexDirection:'row', paddingVertical:15, paddingHorizontal:15, backgroundColor:'#f3f3f3',alignItems:'center'}}>
                                <DefaultText texts="A" style={{fontSize:30, lineHeight:35, marginRight:15}} />
                            
                                
                                <HTML html={item['iq_answer'] ? item['iq_answer'] : '<p>답변이 등록되지 않았습니다.</p>'} tagsStyles={StyleHtml} />
                 
                                
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                
            </View>
        )
    })

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
                    <SectionTitle titles={params.it_name} textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:30}]}>
                    <Image source={{uri:params.thumb}} style={{width:screenWidth-40, height:screenWidth-40}}/>

                    <DefaultText texts={params.title} style={{marginTop:30}} />
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <DefaultText texts="판매가격 : " />
                        <DefaultText texts={numberFormat(params.it_price)+"원"} style={[styled.notoBold]} />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
                        <TouchableOpacity style={[{width:'40%'}, styles.itemViewBtn, {borderColor:'#ff53ad'}]} onPress={()=>ToastAndroid.show('장바구니에 상품을 담았습니다.', ToastAndroid.SHORT)}>
                            <DefaultText texts="장바구니" style={{color:"#ff53ad"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{width:'40%'}, styles.itemViewBtn, {borderWidth:0, boardColor:'transparent', backgroundColor:'#ff53ad'}]} onPress={()=>ToastAndroid.show('구매하기 폼으로 이동합니다', ToastAndroid.SHORT)}>
                            <DefaultText texts="바로구매" style={{color:'#fff'}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{width:'15%'}, styles.itemViewBtn]} onPress={()=>ToastAndroid.show(params.title + '를 위시리스트에 담았습니다.', ToastAndroid.SHORT)}>
                            <Image source={require('../images/wish_off.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#e3e3e3', marginTop:40}}>
                         <PageTabList title="상품정보" tabOn={shopCategory === 1} onPress={() => setShopCategory(1)} buttonStyle={{width:'25%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:14}} />
                        <PageTabList title="구매후기" tabOn={shopCategory === 2} onPress={() => setShopCategory(2)} buttonStyle={{width:'25%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:14}} />
                        <PageTabList title="구매문의" tabOn={shopCategory === 3} onPress={() => setShopCategory(3)} buttonStyle={{width:'25%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:14}} />
                        <PageTabList title="배송/교환" tabOn={shopCategory === 4} onPress={() => setShopCategory(4)} buttonStyle={{width:'25%', justifyContent:'center', alignItems:'center'}} btnTextStyle={{fontSize:14}} />
                        
                    </View>
                    <View>
                        {
                            shopCategory === 1 && 
                            <View style={{padding:20, borderWidth:1, borderColor:'#e3e3e3', marginTop:20}}>
                                <HTML html={params.it_explan ? params.it_explan  : '<p>상품정보가 없습니다.</p>'} tagsStyles={StyleHtml} />
                               
                            </View>
                        }
                        {
                            shopCategory === 2 && 
                            <View style={{borderWidth:1, borderColor:'#e3e3e3', marginTop:20}}>
                                <View>
                                {
                                    sellItemUseListSize > 0 ?
                                    sellItemUseLists
                                    :
                                    <DefaultText texts="등록된 구매후기가 없습니다." />
                                }
                               </View>
                            </View>
                        }
                        {
                            shopCategory === 3 && 

                            <View style={{ borderWidth:1, borderColor:'#e3e3e3', marginTop:20}}>
                                <View>
                                    {
                                        sellItemQaListSize > 0 ?
                                        sellItemQaListData
                                        :
                                        <DefaultText texts="등록된 구매문의가 없습니다." />
                                    }
                                </View>
                               
                            </View>
                        }
                        {
                            shopCategory === 4 && 
                            <View style={{padding:20, borderWidth:1, borderColor:'#e3e3e3', marginTop:20}}>
                               
                                <View>
                                    <DefaultText texts="배송정보" style={[styled.notoBold, {marginBottom:10}]} />
                                    
                                    <View>
                                        <HTML html={params.baesong ? params.baesong  : '<p>배송정보가 없습니다.</p>'} tagsStyles={StyleHtml} />
                                    </View>
            
                                </View>
                                <View style={{marginTop:20}}>
                                    <DefaultText texts="교환정보" style={[styled.notoBold, {marginBottom:10}]} />
                                    
                                    <View>
                                        <HTML html={params.change ? params.change  : '<p>교환정보가 없습니다.</p>'} tagsStyles={StyleHtml} />
                                    </View>
            
                                </View>
                            </View>
                        }
                    </View>
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemViewBtn: {
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:5
    }
})

export default ShopItemView;