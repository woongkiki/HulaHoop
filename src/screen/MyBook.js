import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyBookContent from '../components/MyBookContent';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';
import { Content } from 'native-base';

const MyBook = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="내 서재" style={{marginBottom:20}} /> 
                    <MyBookContent navigation={navigation} />
                </View>
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} focusOn={2} />
        </SafeAreaView>
    );
};

export default MyBook;