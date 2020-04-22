import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { GoButton, NumberButton } from '../../../../shared/customButtons';
import { GlobalStyles } from '../../../../style/globalStyle';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { updateMax, increase, decrease } from '../../../../modules/state';
import * as yup from 'yup'; // for everything

const checkMax = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { updateMaxError, maxPullups } = useSelector(({ state }) => ({
        updateMaxError: state.updateMax.updateMaxError,
        maxPullups: state.updateMax.maxPullups
    }));

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <NumberButton
                    onPress={() => {
                        if (maxPullups < 100) {
                            dispatch(increase());
                        }
                    }}
                />
                <Text style={styles.number}>{maxPullups}</Text>
                <NumberButton
                    style={styles.triangleDown}
                    onPress={() => {
                        if (maxPullups > 0) {
                            dispatch(decrease());
                        }
                    }}
                />
            </View>
            <GoButton
                text="Go"
                style={{ marginVertical: '5%' }}
                /*onPress={() => {
					Alert.alert(
						'Update max pullups',
						'Please be honest for yourself',
						[
							{text: 'Yes', onPress: () => dispatch(updateMax({ maxPullups }))},
							{text: 'No', onPress: () => dispatch(navigation.navigate('Profile'))}
						]
					);
                }}*/
				onPress={() =>{ 
					dispatch(updateMax({ maxPullups }));
					navigation.navigate('ChooseProgram');
				}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    number: {
        fontFamily: 'Jockey-One',
        color: '#333333',
        fontSize: 250,
        lineHeight: 260,
        // marginTop: '15%',
        top: '6%'
    },
    triangleDown: {
        transform: [{ rotate: '180deg' }]
    }
});

export const CheckMax = React.memo(checkMax);