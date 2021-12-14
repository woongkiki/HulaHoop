import React, { useEffect, useState } from 'react';
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from './BOOTSTRAP';
import { textLengthOverCut, itemEndCatergory, numberFormat, ItemAllList, ItemMondayList, ItemEmpty } from '../dummydata';
import styled from '../style/style';
import Spinner from '../components/Spinner';
import Api from '../Api';


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.5 - 30;
const itemHeight = slideWidth * 0.5 - 30 ;

const ItemListEnd = ({navigation}) => {

    const [categoryOn, setCategoryOn] = useState('1');
    const [dummyDatas, setDummyDatas] = useState(ItemAllList);

    //console.log("gn"categoryOn);

    useEffect(()=> {
        if(categoryOn=='1'){
            setDummyDatas(ItemAllList);
        }else if(categoryOn=='2'){
            setDummyDatas(ItemMondayList);
        }else{
            setDummyDatas(ItemEmpty);
        }
    },[categoryOn])


   

    const [endListCategoryId, setEndListCategoryId] = useState('');
    const [itemEndCateList, setItemEndCateList] = useState([]);

    const handleItemList = (index, item) => {
        setCategoryOn(index+1)
        setEndListCategoryId(item.ca_id);
    }


    const ItemEndCate = async () => {
        Api.send('item_categoryEnd', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
             // console.log(resultItem);
             // console.log(arrItems);
               //setMainSlide(arrItems);
                
               setItemEndCateList(arrItems);
               setEndListCategoryId(arrItems[0]['ca_id']);
            }    
        });
    }

    useEffect(()=>{
        ItemEndCate();
    },[]);


    
    const [workListEnd, setWorkListEnd] = useState([]);


    //작품 리스트
    const ItemWorkEndList = async () => {
        Api.send('item_end', {'ca_id':endListCategoryId}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
               // console.log('r',resultItem);
               // console.log('a',arrItems);
                setWorkListEnd(arrItems);
            }    
        });
    }

    useEffect(()=>{
        ItemWorkEndList();
    },[endListCategoryId]);


    //console.log('선택된 카테고리는 ? ', endListCategoryId);
    //console.log('완결 작품 리스트 ? ', workListEnd);

    const itemCategoryList = itemEndCateList.map((item, index)=>(
 
        <TouchableOpacity key={index} style={[styles.categoryBtn, {backgroundColor: (index + 1 == categoryOn ? '#ff53ad' : 'transparent') }]} onPress={()=>{ handleItemList(index, item) }}>
            <SectionTitle titles={item.ca_name} marginBottoms={0} textstyle={ index + 1 == categoryOn ? {color:'#fff'} : {color:'#333'} } /> 
        </TouchableOpacity>
  
    ))
    

   let countData = workListEnd.length;

    if(countData>0){
        const itemLists = workListEnd.map((item, index)=>(
        
            <TouchableOpacity style={{marginBottom:30}} key={index} onPress={()=>{navigation.navigate("ItemView", item)}}>
                <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight, borderRadius:10}} />
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
        ))

        return (
            <View>
                <View style={[styled.containerPadding, styles.categoryBox]}>
                    {itemCategoryList}
                </View>
                <View style={[styled.containerPadding, {flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between', paddingVertical:40}]}>
                    {itemLists}
                </View>    
            </View>
        );
    }else{
        return (
            <View>
                <View style={[styled.containerPadding, styles.categoryBox]}>
                    {itemCategoryList}
                </View>
                <View style={[styled.containerPadding, {flexWrap:'wrap', flexDirection:'row', justifyContent:'center', paddingVertical:40}]}>
                    <Text style={[{textAlign:'center', lineHeight:20}, styled.notoRegular]}>등록된 작품이 없습니다.</Text>
                </View>    
            </View>
        );
    }
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

export default ItemListEnd;