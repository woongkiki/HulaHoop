import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SectionTitle } from './BOOTSTRAP'

const PageTabList = ({title, tabOn, onPress, buttonStyle, btnTextStyle}) => {

    return (
            <TouchableOpacity onPress={ onPress } style={[buttonStyle,{borderBottomWidth:4}, (tabOn ? {borderBottomColor:'#ff53ad'} : {borderBottomColor:'transparent'} )]}>
                <SectionTitle 
                    titles={title} 
                  
                  
                    textstyle={[{paddingBottom:10}, (tabOn ? { color:'#333'} : {color:'rgba(51,51,51,0.3)'}), btnTextStyle]}  
                />
            </TouchableOpacity>
        
    );
};



export default PageTabList;