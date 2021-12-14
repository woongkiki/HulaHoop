import React, { useState, useRef, useEffect } from "react";
import { View,Text, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Fonts from '../style/Fonts';
import { DefaultText } from "./BOOTSTRAP";
import Spinner from '../components/Spinner';
import Api from '../Api';


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const horizontalMargin = 7;
const slideWidth = screenWidth;
const slideImageWidth = slideWidth * 0.85;
const itemWidth = slideImageWidth + horizontalMargin * 2;
const itemHeight = 512;

const myCarousel = ( props ) => {

    const { navigation } = props;

   // console.log('메인배너쓰',props);
    const [loading, setLoading] = useState(false);

    const [mainSlide, setMainSlide] = useState([]);

    const MainBanners = async () => {
        Api.send('main_banner', [], (args)=>{ 
            let resultItem = args.resultItem;
            let arrItems = args.arrItems;
            if (resultItem.result === 'Y' && arrItems) {
                
                //console.log('d',arrItems)
               setMainSlide(arrItems);
            }    
        });
    }

    useEffect(()=>{
        MainBanners();
    },[])

    const MainBannerSlide = ({index, item, onPress})=> {
      return(
          <TouchableOpacity style={styles.slide} key={index} onPress={onPress} activeOpacity={0.9}>
              <View style={{width:slideImageWidth, borderRadius:16, overflow:'hidden', position:'relative'}}>
                  <Image source={{uri:item.thumb}} style={{width:slideImageWidth, height:itemHeight}} />
                  <View style={styles.blackBox}>
                      <View style={styles.blackBoxCont}>
                          <Text style={styles.todayText}>TODAY BOOK</Text>
                          <Text style={styles.mainBannerTitle}>{item.wr_subject}</Text>
                          <Text style={styles.mainBannerWriter}>{item.wr_1}</Text>
                          <Text style={styles.mainBannerKeyword}>{item.keywords}</Text>
                          <View style={styles.voicelistWrap}>
                              <TouchableOpacity>
                                  <Image source={require('../images/main_ban_play.png')} />
                              </TouchableOpacity>
                              <Text style={styles.voicelistText}>
                              <DefaultText texts={item.wr_2add} color={{color:'#fff'}}  />
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    const handleItemView = params => {

        navigation.navigate('ItemView', params);
    }

    const _renderItem = ({ item,index }) => {
        return (
           <MainBannerSlide item={item} index={index} onPress={ () => handleItemView(item) }/>
        );
    };

    return (
      <View style={{width:'100%'}}>
        
            <Carousel
            layout={'default'}
            renderItem={_renderItem}
            data={mainSlide}
            sliderWidth={screenWidth}
            itemWidth={itemWidth}
            
            loopClonePerSide={2}
            inactiveSlideOpacity={0.7}
            inactiveSlideScale={1}
            loop={true}
        />

        
    </View>
  );
    
};

const styles = StyleSheet.create({
  slide: {
      width: itemWidth,
      height: itemHeight,
      paddingHorizontal: horizontalMargin,
      
      // other styles for the item container
  },
  slideInnerContainer: {
      width: slideImageWidth,
      height: itemHeight,
    
      borderRadius:12,
      overflow:'hidden'
      // other styles for the inner container
  },
  blackBox: {
      width: slideImageWidth,
      height: itemHeight,
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      top: 0,
      left: 0
  },
  blackBoxCont : {
      padding: 20,
      paddingTop:50,
      position: 'absolute',
      bottom:0,
      left:0,
      width:slideImageWidth,
  },
  todayText: {
      paddingHorizontal:10,
      paddingVertical:3, 
      fontSize: 12,
      backgroundColor: '#fff',
      borderRadius:12,
      overflow:'hidden',
      color:'#333',
      fontFamily: "TmoneyRoundWind-ExtraBold",
      position:'absolute',
      top:20,
      left:20,
  },
  mainBannerTitle : {
      fontSize: 20,
      color: '#fff',
      fontFamily: "TmoneyRoundWind-ExtraBold",
      marginBottom:10
  },
  mainBannerWriter: {
      fontSize:16,
      color: '#fcfcfc',
      marginBottom:10
  },
  mainBannerKeyword: {
      fontSize:16,
      color: 'rgba(252, 252, 252, 0.7)',
      marginBottom:10,
      
  },
  voicelistWrap: {
      flexDirection: 'row',
      alignItems:'center',
  },
  voicelistText: {
      fontSize: 16,
      color: '#fff',
      marginLeft: 10
  }
})
export default myCarousel;