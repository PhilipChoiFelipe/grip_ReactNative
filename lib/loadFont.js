import React from 'react';
import * as Font from 'expo-font';

export const getFonts = () =>
    Font.loadAsync({
        'IBMPlexSans-light': require('../assets/fonts/IBMPlexSans/IBMPlexSans-Light.ttf'),
        'IBMPlexSans-medium': require('../assets/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf'),
		'IBMPlexSans-regular': require('../assets/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf'),
        'Jockey-One': require('../assets/fonts/Jokey_One/JockeyOne-Regular.ttf')
        // PullUp_ReactNative/assets/fonts/Jokey_One/JockeyOne-Regular.ttf
    });