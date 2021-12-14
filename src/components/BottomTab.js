import React from 'react';
import { SafeAreaView ,View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionCreators as UserAction } from '../redux/module/action/UserAction';

const BottomTab = ( props ) => {


    const {navigation, focusOn, member_login} = props;

    //console.log('bottomTab:', props);

    const userInfos = props.userInfo;


    //console.log('bottomTabs: ', userInfos);

    return (
        <SafeAreaView>
            <View style={styles.bottomTabWrap}>
                <TouchableOpacity style={styles.bottomTabContent} onPress={()=>{navigation.replace('Home')}}>
                    {
                        focusOn === 1 ?
                        <Image source={require('../images/homeIcon.png')} style={{width:20, height:20}} />
                        :
                        <Image source={require('../images/homeIconOff.png')} style={{width:20, height:20}} />
                    }
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTabContent} onPress={()=>{  userInfos ? navigation.navigate('MyBook') : navigation.navigate('Login')  }}>
                    {
                        focusOn === 2 ?
                        <Image source={require('../images/bookIcon.png')} style={{width:20, height:20}} />
                        :
                        <Image source={require('../images/bookIconOff.png')} style={{width:20, height:20}} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTabContent} onPress={()=>{  userInfos ?  navigation.navigate('Mypage', { cateons:1 }) : navigation.navigate('Login') }}>
                    {
                        focusOn === 3 ?
                        <Image source={require('../images/userIcon.png')} style={{width:20, height:20}} />
                        :
                        <Image source={require('../images/userIconOff.png')} style={{width:20, height:20}} />
                    }
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTabContent} onPress={()=>{navigation.navigate('Login')}}>
                    {
                        focusOn === 4 ?
                        <Image source={require('../images/moreIcon.png')} style={{width:20, height:20}} />
                        :
                        <Image source={require('../images/moreIconOff.png')} style={{width:20, height:20}} />
                    }
                   
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bottomTabWrap: {
        flexDirection:'row',
        width:'100%',
        
    },
    bottomTabContent: {
        width:'25%',
        height: 50,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default connect(
    ({ User }) => ({
      userInfo: User.userInfo, //회원정보
    }),
    (dispatch) => ({
      member_login: (user) => dispatch(UserAction.member_login(user)), //로그인
      member_info: (user) => dispatch(UserAction.member_info(user)), //회원 정보 조회
     
    })
  )(BottomTab);