import React, { useState, useRef, useEffect } from "react";
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from '../components/BOOTSTRAP';
import { slidesPopular, textLengthOverCut, numberFormat } from '../dummydata';
import styled from '../style/style';
import Spinner from '../components/Spinner';
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const horizontalMargin = 7;
const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.45;
const itemHeight = slideWidth * 0.45;


const PopularBanner = (props) => {

    const { navigation, triangle, page } = props;


    const [loading, setLoading] = useState(false)
    const [popularpageOn, setPopularPageOn] = useState('');


    

    const [popularWorkData, setPopularWorkData] = useState([]);

    const popularWork = async () => {
        Api.send('work_popular', { 'popularCategory' : 1, }, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
               // console.log('하하', resultItem);
                setPopularWorkData(arrItems);
            }
    
            setLoading(true);
            setPopularPageOn(popularpageOn);
    
        });
    }


    //console.log('인기',popularWorkData);
    
    useEffect(()=>{
        popularWork();
        //console.log(popularWorkData);
    },[popularpageOn]);

    //console.log(popularWorkData.length)
    

    const PopularBannerSlide = ({item, index, onPress})=> {
        return(
            <TouchableOpacity key={index} style={ index===0 ? {marginLeft:0} : {marginLeft:15} } onPress={onPress}>
                <View style={{borderRadius:10, overflow:'hidden', position:'relative'}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight}} />
                    {
                        triangle == true ? 
                        <View style={styles.tri}>
                            <Text style={{color:'#fff',position:'absolute', fontSize:15, fontFamily: "TmoneyRoundWind-ExtraBold", top:2, left:-35 }}>
                                {index+1}
                            </Text>
                        </View>
                         : null
                    }
                    
                </View>
                <View style={styles.titleBox}>
                    <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <DefaultText texts={textLengthOverCut(item.wr_1, 7)} style={[styled.colorGray]} />
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image source={require('../images/wish_off.png')} style={{width:12, height:12, marginRight:5, marginTop:2}} />
                        <Text style={[styled.fontsize00, styled.colorPink]}>{numberFormat(item.wr_good)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    const handleItemView = params => {

        navigation.navigate('ItemView', params);
    }

    const _renderItem = ({ item, index }) => {
        return (
            <PopularBannerSlide item={item} index={index} onPress={ () => handleItemView(item) } />
        );
    };


    return (
        <View>
           {
               loading ?
               <FlatList
                    data ={popularWorkData}
                    horizontal = {true}
                    renderItem = {_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}

                />
                :
                <Spinner />
           }
           
        </View>
    );
    
};


const styles = StyleSheet.create({
    slide: {
        width: slideImageWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin,
        
        // other styles for the item container
    },
    tri: {
        width: 0,
        height: 0,
        borderBottomWidth: 40,
        borderBottomColor: 'transparent',
        borderLeftWidth:40,
        borderLeftColor:'#ff53ad',
        position:'absolute',
        top:0,
        left:0,
        width:40,
        height:40
    },
    titleBox : {
        marginVertical:10
    },
    titleText: {
        fontSize:17,
        
    }

})

export default PopularBanner;