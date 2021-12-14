import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecomBanner from '../components/RecomBanner';
import PopularBanner from '../components/PopularBanner';
import ItemIng from '../components/ItemIng';
import ItemListEnd from '../components/ItemListEnd';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';

import {Content} from 'native-base';

const ItemList = (props) => {


    const {navigation, route} = props;

    //console.log(props);
    //console.log(route.params.ons);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} route={ route.params.ons } />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:30, backgroundColor:'#f3f3f3'}]}>
                    <SectionTitle otherColor="지금 핫한" titles={"인기작품"} style={{marginBottom:20}} /> 
                    <PopularBanner navigation={navigation} />
                </View>
                <View>
                  {route.params.ons == 2 ? <ItemIng navigation={navigation} /> : <ItemListEnd navigation={navigation} /> }
                   
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} />
        </SafeAreaView>
    );
};

export default ItemList;