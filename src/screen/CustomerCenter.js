import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomTab from '../components/BottomTab';
import CustomerContent from '../components/CustomerContent';
import styled from '../style/style';
import { Content } from 'native-base';

const CustomerCenter = ( props ) => {

    const { navigation } = props;

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="고객센터" style={{marginBottom:20}} /> 
                    <CustomerContent navigation={navigation} />
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} />
        </SafeAreaView>
    );
};

export default CustomerCenter;