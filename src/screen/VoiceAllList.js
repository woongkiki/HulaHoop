import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VoiceList from '../components/VoiceList';
import styled from '../style/style';
import { Content } from 'native-base';

const VoiceAllList = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="성우 목록" style={{marginBottom:20}} /> 
                    <VoiceList navigation={navigation} />
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

export default VoiceAllList;