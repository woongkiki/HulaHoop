import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyPageContent from '../components/MyPageContent';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';
import { Content } from 'native-base';

const Mypage = ( props ) => {

    //console.log(route.params.cateons);
   const {navigation, route} = props;

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="마이페이지" style={{marginBottom:20}} /> 
                    <MyPageContent route={route.params.cateons} navigation={navigation}  />
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} focusOn={3} />
        </SafeAreaView>
    );
};

export default Mypage;