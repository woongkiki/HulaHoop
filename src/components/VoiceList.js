import React, { useState, useRef, useEffect } from "react";
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from '../components/BOOTSTRAP';
import { voiceList, textLengthOverCut, numberFormat } from '../dummydata';
import styled from '../style/style';
import Spinner from "./Spinner";
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const horizontalMargin = 7;
const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.27;
const itemHeight = slideWidth * 0.27;


const VoiceList = (props) => {

    const {navigation } = props;

    //console.log(props);

    const [loading, setLoading] = useState(false);

    const [voiceLists, setVoiceLists] = useState([]);

    const VoiceListData = async () => {
        Api.send('voice_list', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
              // console.log('성우정보가져오기 : ', arrItems);

              setVoiceLists(arrItems);
            }    
        });
    }

   // console.log(voiceLists.length);

    useEffect(()=>{
        VoiceListData();

        setLoading(true);
    },[])


    const _renderItem = ({ item,index }) => {
        return (
            <TouchableOpacity key={index} style={ index===0 ? {marginLeft:0} : {marginLeft:15} } onPress={()=>{navigation.navigate('VoiceView', item)}}>
                <View style={{borderRadius:itemHeight, overflow:'hidden', position:'relative'}}>
                    <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight}} />
                </View>
                <View style={styles.titleBox}>
                    <DefaultText texts={textLengthOverCut(item.wr_subject, 10)} />
                </View>
                <View>
                    <View style={{alignItems:'center', justifyContent:'center',flexDirection:'row'}}>
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
                  data ={voiceLists}
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
        marginVertical:10,
        alignItems:'center'
    },
    titleText: {
        fontSize:17,
        
    }

})

export default VoiceList;