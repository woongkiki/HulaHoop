import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import styles from '../style/style';
import { Fonts } from '../style/Fonts';

export const SectionTitle = (props) => {
    let colorsBlack = props.colorblack ? props.colorblack : styles.colorBlack;
    let colorsPink = props.colorpink ? props.colorpink : styles.colorPink;
    let sectionFontSize = props.fontSize ? props.fontSize : styles.fontsize00;
    let ffTmoney = props.fonts ? props.fonts : styles.ffTmoney;
  
    let defaultstyles = props.style ? props.style : '';

    let defaultTextStyle = props.textstyle ? props.textstyle : '';

    let moreBtnYes = props.moreBtn ? {justifyContent:'space-between', alignItems:'center'} : null;

    let moreBtnOnPress = props.onPress ? props.onPress : null;

    return (
        <View style={[{flexDirection:'row'}, defaultstyles, moreBtnYes]}>
            
            <View
                style={[{flexDirection:'row'}]}
            >
            
                {
                    props.otherColor ? <Text style={[colorsPink, sectionFontSize, ffTmoney]}>{props.otherColor} </Text> : null
                }
                <Text style={[sectionFontSize, colorsBlack, ffTmoney, defaultTextStyle]}>
                    {props.titles} 
                </Text>
            </View>
            <View>
                {
                    props.moreBtn &&
                    <TouchableOpacity onPress={moreBtnOnPress}>
                        <Image source={require('../images/more_btn.png')} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export const DefaultText = (props) => {

    let defaultff = props.fontFamily ? props.fontFamily : styles.notoRegular;
    let defaultcolor = props.color ? props.color : {color : '#333'};
    let defaultlh = props.lineHeight ? props.lineHeight : {lineHeight : 20}
    let defaultFontSize = props.fontSize ? props.fontSize : {fontSize: 14};
    let defaultstyles = props.style ? props.style : '';

    return (
        <Text textBreakStrategy={'balanced'} style={[defaultff, defaultcolor, defaultFontSize, defaultlh, defaultstyles]}>{props.texts}</Text>
    )
}

export const Inputs = ({styleInput, placeholder, value, multiline, onChangeText, keyboardType, placeholderTextColor, isPassword }) => {

    //styleInput 스타일 바꿀때
    return (
        <TextInput 
            style={[{height:40, width:'100%', backgroundColor:'#fff', borderWidth:1, borderColor:'#e3e3e3', fontSize:14, paddingLeft:15, borderRadius:5, color:'#333'}, styleInput]} 
            placeholder={placeholder}
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
        />
    )
}


export const DefaultButton = ( {buttonStyle, buttonTitle, buttonTextStyle, onPress} ) => {
    return(
        <TouchableOpacity onPress={onPress} style={[{backgroundColor:'#FF53AD', width:'100%', height:50, justifyContent:'center', alignItems:'center', borderRadius:5}, buttonStyle]}>
            <DefaultText texts={buttonTitle} style={[{color:'#fff'}, buttonTextStyle]} />
        </TouchableOpacity>
    )
}


export const Checkboxs = ({onPress, checkboxText, chkOn, textStyles}) =>{
    return (
        <TouchableOpacity 
        activeOpacity={1}
        onPress={onPress}
        style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}
        >
            <View style={{width:20, height:20, borderWidth:1,  justifyContent:'center', alignItems:'center', borderColor: (chkOn === false ? '#999' : '#FF53AD' )}}>
            {
                chkOn === false ? null : <Image source={require('../images/checkedOn.png')} style={{width:18, height:18}} />
            }
            </View>
            <DefaultText texts={checkboxText} style={[{marginLeft:10}, textStyles]} />
        
         </TouchableOpacity>
    )
}

export const RadioBtn = ({onPress, RadioTitle, radioBtn }) => {
    return(
        <TouchableOpacity 
        activeOpacity={1}
        onPress={onPress}
        style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginRight:10}}
        >
            <View style={{width:15, height:15, borderWidth:1, borderColor:"#333",justifyContent:'center', alignItems:'center',  borderRadius:15}}>
                <View style={{width:8, height:8, backgroundColor:(radioBtn ? '#ff53ad' : '#fff'), borderRadius:5}}></View>
            </View>
            <DefaultText texts={RadioTitle} style={{marginLeft:5}} />
        
        </TouchableOpacity>
    )
}