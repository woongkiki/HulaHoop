import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text ,TouchableOpacity ,Image, Dimensions, StyleSheet} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyBookContent from '../components/MyBookContent';
import styled from '../style/style';
import { Content } from 'native-base';
import { textLengthOverCut, numberFormat } from '../dummydata/index';
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.5 - 30;
const itemHeight = slideWidth * 0.5 - 30 ;


const SearchResult = ( props ) => {

    const {navigation, route} = props;

    const params = route.params;

    const [searchText, setSearchText] = useState(params.title);
    const [searchResult, setSearchResult] = useState([]);
    //console.log('파라미터 값 : ', params);

    const SearchItem = async () => {
        Api.send('search_list', {'schText': searchText }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
    
                setSearchResult(arrItems);
              
            }    
        });
    }

    useEffect(()=>{
        SearchItem();
    },[])
   
    console.log(searchResult);

    const schDataLength = searchResult.length;

    const itemLists = searchResult.map((item, index)=>(
        
        <TouchableOpacity style={{marginBottom:30 ,marginRight:(item.idx % 2 == '0' ? 0 : 20) }} key={index} onPress={()=>{navigation.navigate('ItemView', item)}}>
            <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
            <View style={styles.titleBox}>
                <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <DefaultText texts={textLengthOverCut(item.wr_1, 7)} style={[styled.colorGray]} />
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    
                    <Image source={require('../images/wish_off.png')} style={{width:12, height:12, marginRight:5, marginTop:2}} />
                    <Text style={[styled.fontsize00, styled.colorPink]}>{numberFormat(1152)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ))


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="검색결과" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <View style={{flexDirection:'row'}}>
                        <DefaultText texts="검색결과" style={[styled.notoBold, styled.fontsize02, {marginBottom:20}]} /> 
                        <Text style={[styled.notoRegular, styled.fontsize02, styled.lineHeight]}>(<Text style={[styled.colorPink, styled.notoBold]}>{searchText}</Text>)</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            {
                                schDataLength > 0 ?
                                itemLists
                                :
                                <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1, flex:1}}>
                                    <DefaultText texts="검색결과가 없습니다." style={{color:'#999'}} />
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    categoryBox : {
        paddingVertical: 20,
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    categoryBtn: {
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:30,
    },
    titleBox : {
        marginVertical:10
    },
    titleText: {
        fontSize:17,
        
    }
})

export default SearchResult;