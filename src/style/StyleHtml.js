import React from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import styled from '../style/style';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const slideWidth = screenWidth;

export default StyleSheet.create({
    p:{
        fontSize:14,
        lineHeight:20,
        fontFamily: 'NotoSansKR-Regular',
    },
    br:{
       display: 'none'
    },
    img:{
        width:screenWidth-80
    }
})