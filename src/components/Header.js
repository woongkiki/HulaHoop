import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Modal, TextInput, Alert, Linking } from 'react-native';

import { SectionTitle, DefaultText } from '../components/BOOTSTRAP';
import styled from '../style/style';
import { numberFormat } from '../dummydata';
import { Content } from 'native-base';
import { DrawerActions } from '@react-navigation/native';
import Api from '../Api';

const Header = (props) => {

    const {navigation, route} = props;

    let menuOn = route;

    const [alrimVisible, setAlrimVisible] = useState(false);
    const [mainSchForm, setMainSchForm] = useState(false);

    const [schText, setSchText] = useState('이');

    return (
        <>
        <View style={styles.headerContainer}>
            <View style={styles.headerContainerInner}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../images/mobileAlarm.png')}  />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> navigation.replace('Home')}>
                        <Image source={require('../images/moblieLogo.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>setMainSchForm(true)}>
                        <Image source={require('../images/hoop_search.png')} style={{width:17, height:17}} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.headerContainerInner, {justifyContent: 'space-around'}]}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home', { ons : 1 })} style={[{paddingHorizontal:15,paddingVertical:5, borderRadius:30, backgroundColor:(menuOn === 1 ? '#333' : null) }]}>
                        
                        <SectionTitle titles="추천" marginBottoms={0} textstyle={{color: (menuOn===1 ? '#fff' : '#333')}} /> 
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('ItemList', { ons : 2 })} style={[{paddingHorizontal:15,paddingVertical:5, borderRadius:30, backgroundColor:(menuOn === 2 ? '#333' : null) }]}>
                        <SectionTitle titles="연재" marginBottom={0} textstyle={{color: (menuOn=== 2 ? '#fff' : '#333')}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('ItemList', { ons : 3 })} style={[{paddingHorizontal:15,paddingVertical:5, borderRadius:30, backgroundColor:(menuOn === 3 ? '#333' : null) }]}>
                        <SectionTitle  titles="완결" marginBottom={0} textstyle={{color: (menuOn===3 ? '#fff' : '#333')}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('EventList', { ons : 4 })} style={[{paddingHorizontal:15,paddingVertical:5, borderRadius:30, backgroundColor:(menuOn === 4 ? '#333' : null) }]}>
                         <SectionTitle titles="이벤트" textstyle={{color: (menuOn===4 ? '#fff' : '#333')}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Shop', { ons : 5 })} style={[{paddingHorizontal:15,paddingVertical:5, borderRadius:30, backgroundColor:(menuOn === 5 ? '#333' : null) }]}>
                         <SectionTitle titles="샵" textstyle={{color: (menuOn===5 ? '#fff' : '#333')}} />
                    </TouchableOpacity>
                </View>
            </View>

            
        </View>

    
        <Modal 
            animationType='fade'
            visible={mainSchForm}
          
            transparent={true}
        >
            <View style={[styles.modalContainer]}>
                <View style={{ backgroundColor:'#f555a9',justifyContent:'space-between', flexDirection:'row', flexWrap: 'wrap', padding:10, flexWrap:'wrap'}}>
                    <View style={{flexDirection:'row', backgroundColor:'#fff', justifyContent:'space-between', alignItems:'center',width:'85%' }} >
                        <TextInput value={schText} onChangeText={setSchText} placeholder="검색어를 입력하세요" placeholderTextColor="#f555a9" style={styles.textInputs} />
                        <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={()=>{ navigation.navigate('SearchResult', { title: schText} ) }}>
                            <Image source={require('../images/ico_search.png')} style={{width:29, height:29}}  />
                            
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{ setMainSchForm(false) }} style={{}} onPress={()=>setMainSchForm(false)}>
                        <Image source={require('../images/close_btn.png')} style={{width:50, height:50}}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{setMainSchForm(false)}} style={{flex:1, backgroundColor:'rgba(0,0,0,0.4)'}} activeOpacity={0.8}></TouchableOpacity>
            </View>
            
        </Modal>
   

        </>
    );
};

const styles = StyleSheet.create({

    headerContainer : {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
  
    },
    headerContainerInner : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical: 10,
        flexWrap: 'wrap',
    },
    modalContainer: {
        flex:1,
       
       
    },
    modalCloseBtn: {
        position:'absolute',
        right:0,
        top:0,
        zIndex:100
    },
    modalInfoTop: {
        padding:20,
        backgroundColor:'#f555a9'
    },
    myIdTextBox: {
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        marginBottom:20
    },
    myIdText: {
        fontSize:20,
        color:'#fff',
        lineHeight:25
    },
    myInfoBtns: {
        backgroundColor:'#fff',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:35
    },
    coinBoxBtn: {
        backgroundColor:'#fff',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        width:'50%',
    },
    myMenuBtn: {
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#e3e3e3'
    },
    textInputs: {
        paddingLeft:20,
        fontSize:18,
        flex:6,
        color:'#333'
        
    }
    
 
})

export default Header;