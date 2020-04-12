import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthStack from './routes/authStack';
import SettingStack from './routes/settingStack'
import AppStack from './routes/appStack';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const getFonts = () =>
    Font.loadAsync({
        'IBMPlexSans-light': require('./assets/fonts/IBMPlexSans/IBMPlexSans-Light.ttf'),
		'IBMPlexSans-medium': require('./assets/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf'),
        'Jockey-One': require('./assets/fonts/Jokey_One/JockeyOne-Regular.ttf')
		// PullUp_ReactNative/assets/fonts/Jokey_One/JockeyOne-Regular.ttf
    });

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if (fontsLoaded) {
        return (
            // <SettingStack />
			<AppStack />
        );
    } else {
        return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />;
    }
}
