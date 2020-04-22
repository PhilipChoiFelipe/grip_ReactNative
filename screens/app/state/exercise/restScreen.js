import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

import { useDispatch, useSelector } from 'react-redux';

export const RestScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>THIS IS REST SCREEN</Text>
            </View>
            <GoButton text="NEXT" onPress={() => {navigation.navigate('DoneScreen')}} style={{ margin: '10%' }}/>
        </View>
    );
};