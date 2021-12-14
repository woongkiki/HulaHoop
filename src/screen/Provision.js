import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Content } from 'native-base';
import {SectionTitle} from '../components/BOOTSTRAP';
import styled from '../style/style';
import Api from '../Api';
import StyleHtmlContent from '../style/StyleHtmlContent';
import HTML from 'react-native-render-html';

const Provision = (props) => {

    const {navigation} = props;

    //console.log(props);

    const [provisionData, setProvision] = useState('');

    const ProvisionData = async () => {
        Api.send('config_contentProvision', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
               setProvision(arrItems);
            }    
        });
    }

    useEffect(()=>{
        ProvisionData();
    },[]);


    //console.log(provisionData['co_content']);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row', width:'100%', paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
                <View style={{position:'absolute',left:20, top:15}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../images/left_arr.png')} style={{width:11, height:20}} />
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:'100%'}} >
                    <SectionTitle titles="이용약관" textstyle={[styled.fontsize03]} />
                </View>
            </View>
            <View style={[styled.containerPadding, {paddingVertical:30}]}>
                 <HTML html={provisionData["co_content"]} tagsStyles={StyleHtmlContent} />
            </View>
        </SafeAreaView>
    );
};

export default Provision;