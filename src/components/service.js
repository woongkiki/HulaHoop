import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
    TrackPlayer.addEventListener('remote-play', () =>
        TrackPlayer.play()
    );
    TrackPlayer.addEventListener('remote-pause', ()=>
        TrackPlayer.pause()
    );
    TrackPlayer.addEventListener('remote-previous', ()=>
        TrackPlayer.skipToPrevious()
    );
    TrackPlayer.addEventListener('remote-next', ()=>
        TrackPlayer.skipToNext()
    );
    TrackPlayer.addEventListener('remote-jump-forward', () => {
        let newPosition = TrackPlayer.getPosition();
        let duration = TrackPlayer.getDuration();
        newPosition += 10;
        if(newPosition > duration){
            newPosition = duration;
        }
        TrackPlayer.seekTo(newPosition);
    });
    TrackPlayer.addEventListener('remote-jump-backword', () => {
        let newPosition = TrackPlayer.getPosition();
        newPosition -= 10;
        if(newPosition < 0 ){
            newPosition = 0;
        }
        TrackPlayer.seekTo(newPosition);
    })
}