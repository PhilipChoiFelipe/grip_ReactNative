import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { tabToggle } from '../../../../modules/state';

export const GraphScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    const handleComplete = () => {
        dispatch(tabToggle());
        navigation.navigate('HomeTab');
    };
    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>THIS IS GraphScreen</Text>
            </View>
            <GoButton text="HOME" onPress={handleComplete} style={{ margin: '10%' }}/>
        </View>
    );
};