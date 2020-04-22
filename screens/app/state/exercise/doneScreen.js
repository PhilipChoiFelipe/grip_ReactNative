import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

import { useDispatch, useSelector } from 'react-redux';

export const DoneScreen = ({ navigation }) => {
    let dispatch = useDispatch();
    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>THIS IS DONE SCREEN</Text>
            </View>
            <GoButton text="DONE" onPress={() => {navigation.navigate('SummaryScreen')}} style={{ margin: '10%' }}/>
        </View>
    );
};