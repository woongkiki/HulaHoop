import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'} color="#333" />
        </View>
    );
};

export default Spinner;