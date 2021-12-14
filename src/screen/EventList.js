import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventLists from '../components/EventLists';
import BottomTab from '../components/BottomTab';
import styled from '../style/style';

import {Content} from 'native-base';

const EventList = ({navigation, route}) => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} route={ route.params.ons } />
            <Content>
                <View style={[styled.containerPadding, {paddingVertical:50}]}>
                    <SectionTitle titles="고객센터" style={{marginBottom:20}} /> 
                    <EventLists navigation={navigation} />
                </View>
                
                <Footer navigation={navigation} />
            </Content>
            <BottomTab navigation={navigation} />
        </SafeAreaView>
    );
};


export default EventList;