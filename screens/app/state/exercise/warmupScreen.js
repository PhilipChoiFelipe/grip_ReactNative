import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

import { useDispatch, useSelector } from 'react-redux';

export const WarmupScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    // const { program } = useSelector(state => ({
    // 	program: state.state.program.program
    // }));
	let backgroundColor = route.params.backgroundColor;
    return (
        <View style={{...GlobalStyles.container, backgroundColor: backgroundColor}}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>THIS IS WARMUP</Text>
            </View>
            <GoButton
                text="NEXT"
				style={{ margin: '10%' }}
                onPress={() => {
                    navigation.navigate('SetScreen');
                }}
            />
        </View>
    );
};