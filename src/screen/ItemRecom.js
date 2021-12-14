import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecomBanner from '../components/RecomBanner';
import styled from '../style/style';

import {Content} from 'native-base';

const ItemRecom = ({navigation, route}) => {

    //console.log(navigation);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} route={ route.params.ons } />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:30}]}>
                    <SectionTitle otherColor="훌라후프" titles={"추천작"} style={{marginBottom:20}} /> 
                    <RecomBanner navigation={navigation} />
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

export default ItemRecom;