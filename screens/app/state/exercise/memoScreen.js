import React, { useEffect, useState } from 'react';

//design
import { Text, View, StyleSheet, Modal, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    Keyboard } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { GoButton } from '../../../../shared/customButtons';
import { FontAwesome } from '@expo/vector-icons';
import { BackgroundColors } from '../../../../assets/colors/backgroundColors';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { writeReflection } from '../../../../modules/reflection';
import { tabToggle } from '../../../../modules/appState'

export const MemoScreen = ({ toggleModal }) => {
    const backgroundColor =
        BackgroundColors[Math.floor(Math.random() * (BackgroundColors.length - 1))];
    return (
        <View style={{...styles.container, backgroundColor: backgroundColor}}>
            <View style={styles.title_Container}>
                <Text style={styles.title}>How's your Pull?</Text>
            </View>
            <View style={styles.body_Container}>
                <TextInput placeholder="write here" />
            </View>
            <GoButton text="SAVE" onPress={toggleModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
		flex: 1
	},
	title_Container: {
		marginHorizontal: 20,
		marginTop: 25,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(51, 51, 51, 0.75)'
	}, 
	title: {
		fontSize: 32,
		color: '#333333',
		fontFamily: 'Jockey-One',
	},
	body_Container:{
		flex:1,
		
	}
});