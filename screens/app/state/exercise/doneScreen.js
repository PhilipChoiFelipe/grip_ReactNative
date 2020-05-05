import React from 'react';

import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

import { useDispatch, useSelector } from 'react-redux';
import { setReset } from '../../../../modules/appState';

export const DoneScreen = ({ navigation }) => {
	let dispatch = useDispatch();
    const handleNavigation = () => {
		navigation.navigate('SummaryScreen');
		dispatch(setReset());
	}
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>WELL DONE!!</Text>
            </View>
            <GoButton text="DONE" onPress={handleNavigation} style={{ margin: '10%' }}/>
        </SafeAreaView>
    );
};