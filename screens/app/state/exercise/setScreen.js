import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

import { useDispatch, useSelector } from 'react-redux';

export const SetScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    let program = route.params.program;
	let backgroundColor = route.params.backgroundColor;
    console.log(program);
    return (
        <View style={{...GlobalStyles.container, backgroundColor: backgroundColor}}>
            <View style={GlobalStyles.body_Container}>
                <Text style={GlobalStyles.title}>THIS IS SET [{program.set[0].rep}]</Text>
            </View>
            <GoButton
                text="NEXT"
				style={{ margin: '10%' }}
                onPress={() => {
                    navigation.navigate('RestScreen');
                }}
            />
        </View>
    );
};