import React from 'react';
import { SafeAreaView, View, Text} from 'react-native';
import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterContent from '../components/RegisterContent';
import styled from '../style/style';
import { Content } from 'native-base';

const Register = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <Header navigation={navigation} />
            <Content>
                <View style={[{paddingVertical:50, backgroundColor:'#F7F9FC'}]}>
                    <View style={[styled.containerPadding]}>
                        <SectionTitle titles="훌라후프 회원가입" style={{marginBottom:20}} /> 
                    </View>
                    <RegisterContent navigation={navigation} />
                </View>
                <Footer navigation={navigation} />
            </Content>
        </SafeAreaView>
    );
};

export default Register;