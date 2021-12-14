import React from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from './Fonts';

export default StyleSheet.create({
    colorBlack: { color:'#333' },
    colorPink: { color:'#FF53AD' },
    colorGray: { color:'rgba(51,51,51, 0.5)' },
    fontsize00 : {fontSize:15},
    fontsize01 : {fontSize:16},
    fontsize02 : {fontSize:17},
    fontsize03 : {fontSize:18},
    ffTmoney: { fontFamily: Fonts.TmoneyBold },
    ffTmoneyR: { fontFamily: Fonts.TmoneyRegular},
    notoBold: { fontFamily: Fonts.NotoBold },
    notoMedium: { fontFamily: Fonts.NotoMedium },
    notoRegular: { fontFamily: Fonts.NotoRegular },
    lineHeight: {lineHeight:20},
    containerPadding: {paddingHorizontal:20}
})