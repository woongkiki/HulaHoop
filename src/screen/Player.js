import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Image, Modal } from 'react-native';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import { useTrackPlayerEvents, useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';

const tracks = [
  {
    id : 0,
    url: require('../tracks/audioSample.mp3'),
    title: 'sample1',
    artist: '웅키',
    artwork: 'https://cnj04.cafe24.com/data/file/audio_work/3696040211_TxprRQmu_f1f554a58dc1bcd33135b719f5280f9ebfe8cafe.jpg',
    voiceActor: '이다은, 황찬영, 김은애'
  },
  {
    id : 1,
    url: require('../tracks/sample2.mp3'),
    title: 'sample2',
    artist: '웅키 2',
    artwork: 'https://cnj04.cafe24.com/data/file/audio_work/3696040211_sZIB1jMb_fb95fb670d8d2c397c9109f0ba8e039c59385cde.jpg',
    voiceActor: '성우명'
  },
];

TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE, TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS, TrackPlayer.CAPABILITY_SKIP_TO_NEXT, TrackPlayer.CAPABILITY_JUMP_BACKWARD, TrackPlayer.CAPABILITY_JUMP_FORWARD],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY, 
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    TrackPlayer.CAPABILITY_JUMP_FORWARD
  ]
})



const App = (props) => {

  

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(250);

  //console.log(useTrackPlayerProgress());


  const [trackArtwork, setTrackArtWork] = useState(''); // 현재 음원 이미지
  const [trackTitle, setTrackTitle] = useState(''); // 현재 음원 제목
  const [trackArtist, setTrackArtist] = useState(''); // 현재 음원 아티스트
  const [voiceActor, setVoiceActor] = useState('');


  const [modalVisible, setModalVisible] = useState(false);

  const setUpTrackPlayer = async () => {
    try {   
      await TrackPlayer.setupPlayer();
      
      await TrackPlayer.add(tracks);

      

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  useEffect(()=>{
    if(!isSeeking && position && duration){
      setSliderValue(position/duration);
    }
  },[position, duration]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if(event.state === STATE_PLAYING){
      setIsPlaying(true);
    }else{
      setIsPlaying(false);
    }
  });

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], async events => {

      const track = await TrackPlayer.getTrack(events.nextTrack);
     
      const {title, artist, artwork, voiceActor} = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtWork(artwork);
      setVoiceActor(voiceActor);
      
      //console.log(track);


  })

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {


    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const PrevAudioBtn = async () => {

    let audioPosition = position;
  

    audioPosition -= 10;
    
    if(audioPosition < 0 ){
      audioPosition = 0;
    }


    audioPosition = audioPosition / duration;

    await TrackPlayer.seekTo(audioPosition * duration);
    setSliderValue(audioPosition);
    //setIsSeeking(false);   

  }

  const NextAudioBtn = async () => {

    let audioPosition = position;
    console.log('위',audioPosition)

    audioPosition += 10;
    
    if(audioPosition < 0 ){
      audioPosition = 0;
    }


    audioPosition = audioPosition / duration

    await TrackPlayer.seekTo(audioPosition * duration);
    setSliderValue(audioPosition);
    //setIsSeeking(false);   

  }


  const PlayListMy = tracks.map((item, index)=>{
    return(
      <View style={styles.playListLine} key={index}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Text>{item.title}</Text>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center' ,width:103, height:40, borderRadius:40, backgroundColor:'rgba(245,85,169,0.1)'}}>
            <Image source={require('../images/audio_ico.png')} style={{marginRight:10}} />
            <Text style={{color:'#F555A9', fontSize:14}}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  return (
    <>
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.albumTitle}>{trackTitle}</Text>
      </View>
      
      <View style={styles.writerContainer}>
        <Text style={styles.wrtier}>{trackArtist}</Text>
      </View>
      <View style={styles.albumThumbBox}>
        <Image source={{uri : trackArtwork }} style={[{width:240, height:240}, styles.albumThumb]} />
      </View>

      <View style={styles.audioSetting}>
          <TouchableOpacity style={styles.playList} onPress={()=>{setModalVisible(!modalVisible)}}>
            <Image source={require('../images/audioPlayList.png')} />
          </TouchableOpacity>
          <View style={styles.playAudioSpeed}>
            <Text style={styles.playAudioSpeedText}>192kbps 1x</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../images/audioBookmark.png')} />
          </TouchableOpacity>
      </View>

      <View style={styles.voiceActorWrap}>
        <Text style={styles.voiceActorText}>{voiceActor}</Text>
      </View>

      <View style={styles.progress}>
        <Slider
          style={{width:'100%'}}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#F555A9"
          maximumTrackTintColor="#ffffff"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          thumbTintColor="#F555A9"
        />
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
          <Text style={{color:'#fff'}}>
            {new Date(position*1000).toISOString().substr(14,5)}
          </Text>
          <Text style={{color:'#fff'}}>
          {new Date(duration * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>

      
      
      <View style={styles.row}>
        <View>
          <TouchableOpacity style={{width:25,height:20}} onPress={()=>TrackPlayer.skipToPrevious()}>
            <Image source={require('../images/previous_source_new.png')} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>PrevAudioBtn()}>
            <Image source={require('../images/skip_previous_new.png')}/>
          </TouchableOpacity>
          {
            isPlaying ?
            <TouchableOpacity style={styles.btn} onPress={()=>TrackPlayer.pause()} >
              <Image source={require('../images/pause_btn_new.png')} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.btn} onPress={()=>TrackPlayer.play()} >
              <Image source={require('../images/play_btn_new.png')} />
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={()=>NextAudioBtn()}>
            <Image source={require('../images/skip_next_new.png')}/>
          </TouchableOpacity>
          
        </View>
        <View>
          <TouchableOpacity style={{width:25,height:20}} onPress={()=>TrackPlayer.skipToNext()}>
            <Image source={require('../images/next_source_new.png')} />
          </TouchableOpacity>
        </View>        
        
      </View>
      <View style={{paddingHorizontal:20}}>
          <View style={{justifyContent:'center', alignItems:'center', height:50, backgroundColor:'rgba(255,255,255,0.7)', borderRadius:5, marginTop:20}}>
            <Text>
                등록된 자막이 없습니다.
            </Text>
          </View>
      </View>
      
    </View>
    <Modal
        animationType='fade'
        visible={modalVisible}
      > 
      <View>
        <View style={styles.modalTitleBox}>
          <Text style={styles.modalTitle}>나의 재생목록</Text>
          <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
            <Image source={require('../images/playclose.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.playListWrap}>
          {PlayListMy}
        </View>
      </View>
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#222630'
  },
  titleContainer:{
    paddingTop:40,
    marginBottom:10,
    alignItems:'center'
  },
  writerContainer: {
    alignItems:'center',
    marginBottom:30
  },
  wrtier:{
    color: '#fff'
  },
  albumTitle: {
    fontSize:17,
    color: '#fff'
  },
  albumThumbBox: {
    alignItems:'center',
    marginBottom:45
  },
  albumThumb:{
    borderRadius:240,
    overflow: 'hidden'
  },
  audioSetting: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  playAudioSpeed: {
    width:130,
    height: 31,
    backgroundColor:'black',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
   },
   playAudioSpeedText: {
    color:'#fff'
   },
   voiceActorWrap: {
     paddingHorizontal:20,
     marginVertical:25
   },
   voiceActorText: {
      color:'#fff',
      textAlign:'center'
   },
   progress: {
      width:'100%',
    
      marginBottom:30
   },
  btn:{
   
    marginHorizontal:20,
    width:55,
    height: 55
  },
  text: {
    fontSize: 30,
    color:'white',
    textAlign:'center'
  },
  row:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'

  },

  modalTitleBox: {
    height:65,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    borderBottomWidth:1,
    borderBottomColor:'#e3e3e3'
  },
  modalTitle:{
    fontSize:15
  },
  playListLine :{
    paddingVertical:15,
    paddingHorizontal:20,
    borderBottomWidth:1,
    borderBottomColor:'#e3e3e3'
    
  }
});

export default App;