import React, {useState, useEffect} from 'react';
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import Fonts from '../style/Fonts';
import { DefaultText, SectionTitle } from './BOOTSTRAP';
import styled from '../style/style';
import PageTabList from '../components/PageTabList';
import Api from '../Api';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.5 - 30;
const itemHeight = slideWidth * 0.5 - 30 ;

const EventLists = (props) => {

    const {navigation} = props;

    //console.log(props);
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    if(month<10){
        month = '0'+month;
    }
    let date = new Date().getDate();
    if(date<10){
        date = '0'+date;
    }

    const [category, setCategory] = useState(1);
    
    const [nowDate, setNowDate] = useState(year+'-'+month+'-'+date);
    const [typeData, setTypeData] = useState('');
    const [eventDataList, setEventDataLis] = useState([]);

   

    const EventListApiData = async ( e ) => {

        setNowDate(year+'-'+month+'-'+date);

        Api.send('board_event', {'nowDate':nowDate, 'type':e}, (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {

                console.log(resultItem);
                setEventDataLis(arrItems);
                setTypeData(e);
            }    
        });
    }

    useEffect(()=>{

        EventListApiData('ing');
    },[]);

    useEffect(()=>{
        if(category==1){
            EventListApiData('ing');
        }else if(category==2){
            EventListApiData('End');
        }
    },[category]);

    
    

    

    const eventDataListSize = eventDataList.length;

    const EventitemLists = eventDataList.map((item, index)=>(
        
        <View key={index} style={{paddingVertical:25,  borderBottomWidth:1, borderBottomColor:'#e3e3e3'}}>
            <TouchableOpacity onPress={ ()=>{navigation.navigate('EventView', item)} }>
                <View>
                    <Image source={{uri:item.thumb}} style={{width:screenWidth-40, height:175}} />
                    {
                        typeData == 'End' ? 
                        <View style={{width:'100%', height:'100%', position:'absolute', top:0, left:0, backgroundColor:'rgba(0,0,0,0.6)', justifyContent:'center', alignItems:'center'}}>
                            <DefaultText texts="이벤트 종료!" color={{color:'#fff'}} />
                        </View>
                        :
                        null
                    }
                </View>
                <Text style={[styles.eventTitle, styled.notoBold]}>{item.wr_subject}</Text>
                <View style={{flexDirection:'row', marginTop:15}}>
                    <Text style={styles.eventDateGigan}>기간 :</Text>
                    <Text style={[styles.eventDateGiganNumber, styled.colorGray]}>
                        {item.wr_1}
                    </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:15}}>
                    <Text style={styles.eventDateGigan}>내용 :</Text>
                    <Text style={[styles.eventDateGiganNumber, styled.colorGray]}>
                        {item.wr_2}
                    </Text>
                </View>
                
            </TouchableOpacity>
        </View>
    ))
    

    return (
        <View>
            <View style={styles.eventCategory}>
                <PageTabList title="진행중인 이벤트" buttonStyle={{marginRight:15}} tabOn={category === 1} onPress={() => setCategory(1)} />
                <PageTabList title="종료된 이벤트"  tabOn={category === 2} onPress={() => setCategory(2)} />    
            </View>
            <View style={{borderTopWidth:1, borderTopColor:'#e3e3e3'}}>
                {
                    eventDataListSize > 0 ?
                    EventitemLists 
                    :
                    <View style={{paddingVertical:40, justifyContent:'center', alignItems:'center', borderTopColor:'#e3e3e3', borderBottomColor:'#e3e3e3', borderBottomWidth:1, borderTopWidth:1}}>
                        <DefaultText texts="등록된 게시물이 없습니다." style={{color:'#999'}} />
                    </View>
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    eventCategory : {
        flexDirection: 'row',
        marginBottom:30
    },
    eventTitle : {
        fontSize:18,
        lineHeight: 23,
        marginTop:20
    },
    eventDateGigan : {
        fontSize: 15,
        width:50
    },
    eventDateGiganNumber : {
        fontSize: 15
    }
});

export default EventLists;