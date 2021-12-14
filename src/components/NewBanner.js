import React, { useState, useRef, useEffect } from "react";
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from './BOOTSTRAP';
import { slidesNew, textLengthOverCut, numberFormat } from '../dummydata';
import styled from '../style/style';
import Spinner from '../components/Spinner';
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const horizontalMargin = 7;
const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.4;
const itemHeight = slideWidth * 0.4;


const NewBanner = (props) => {


    const { navigation } = props;

    //console.log('신규 : ', props);

    const [loading, setLoading] = useState(false);

    const [newWorkList, setNewWorkList] = useState([]);

    const newWork =  async () => {
        Api.send('work_new', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
               //console.log('신규아이템 불러오기 : ', arrItems);

               setNewWorkList(arrItems);
             
            }    
        });
    }

    useEffect(()=>{
        newWork();

        setLoading(true);
    },[navigation])

    //console.log('신규 배열로 생성 : ', newWorkList);

    const _renderItem = ({ item,index }) => {
        return (
            <TouchableOpacity key={index} style={ index===0 ? {marginLeft:0} : {marginLeft:15} } onPress={()=>{navigation.navigate("ItemView", item)}}>
                <View style={{borderRadius:10, overflow:'hidden', position:'relative'}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight}} />
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
        );
    };


    return (
        <View>
           {
               loading ?
               <FlatList
                    data ={newWorkList}
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

    titleBox : {
        marginVertical:10
    },
    titleText: {
        fontSize:17,
        
    }

})

export default NewBanner;