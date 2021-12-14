import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Content } from 'native-base';
import {SectionTitle} from '../components/BOOTSTRAP';
import styled from '../style/style';
import Api from '../Api';
import StyleHtmlContent from '../style/StyleHtmlContent';
import HTML from 'react-native-render-html';


const PrivacyContent = (props) => {

    const {navigation} = props;

    const [privacyData, setPrivacyData] = useState('');

    const PrivacyData = async () => {
        Api.send('config_contentPrivacy', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                setPrivacyData(arrItems);

                //console.log(resultItem)
                
            }    
        });
    }

    useEffect(()=>{
        PrivacyData();
    },[]);

    console.log(privacyData);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="개인정보처리방침" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <View style={[styled.containerPadding, {paddingVertical:30}]}>
                <Text style={[styled.notoRegular ,{textAlign:'center', lineHeight:20}]}>
                    <HTML html={privacyData["co_content"]} tagsStyles={StyleHtmlContent} />
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default PrivacyContent;