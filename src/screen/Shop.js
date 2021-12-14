import React, {useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, Dimensions} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';
import { Content } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { numberFormat, textLengthOverCut } from '../dummydata';
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.5 - 30;
const itemHeight = slideWidth * 0.5 - 30;

const Shop = (props) => {

    const {navigation, route} = props;

    //console.log(props);
    const [nowCategory, setNowCategory] = useState(1010);
    const [shopCategory, setShopCategory] = useState([]);

    const ShopListCategory = async () => {
        Api.send('shop_category', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
               // console.log(arrItems);
                setShopCategory(arrItems);
                
            }    
        });
    }

    const _CategoryChange = (a) => {
        setNowCategory(a);
    }


    const [shopItemList, setShopItemList] = useState([]);

    const ShopListApi = async () => {
        Api.send('shop_list', {'ca_id':nowCategory}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                //console.log(resultItem);
                setShopItemList(arrItems)
            }    
        });
    }


    useEffect(()=>{
        ShopListCategory();
        
    },[]);

    useEffect(()=>{
        ShopListApi();
    },[nowCategory]);


    console.log(shopItemList);


    const ShopCategoryDatas = shopCategory.map((item, index)=>{
        return(
            <View key={index} style={index =! 0 && {marginRight:20}}>
                <TouchableOpacity onPress={()=>{_CategoryChange(item.ca_id)}}>
                    <SectionTitle titles={item.ca_name} textstyle={[styled.ffTmoneyR, nowCategory == item.ca_id && styled.ffTmoney]} />
                </TouchableOpacity>
            </View>
        )
    })
   

    const itemCategoryList = shopItemList.map((item, index)=>(
 
        <TouchableOpacity key={index} style={{width:slideImageWidth}} onPress={()=>navigation.navigate('ShopItemView', item)}>
            <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight}} />
            <View style={{marginTop:10, marginBottom:10}}>
                <DefaultText texts={textLengthOverCut(item.it_name,10)} />
            </View>
            <View style={{alignItems:'flex-end'}}>
                <DefaultText texts={numberFormat(item.it_price)+"원"}/>
            </View>
        </TouchableOpacity>
  
    ))


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} route={ route.params.ons } />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="샵" style={{marginBottom:20}} /> 
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        {ShopCategoryDatas}
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={{flexDirection:'row'}}>
                            {
                                shopItemList.length > 0 ?
                                itemCategoryList
                                :
                                <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1,width:'100%'}}>
                                    <DefaultText texts="등록된 상품이 없습니다." style={{color:'#999'}} />
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} />
        </SafeAreaView>
    );
};

export default Shop;