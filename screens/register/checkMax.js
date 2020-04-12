import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { GoButton, NumberButton } from '../../shared/customButtons';
import { GlobalStyles } from '../../style/globalStyle'

export const CheckMax = ({ navigation }) => {
	return (
		<View style={GlobalStyles.container}>
			<View style={GlobalStyles.title_Container}>
				<Text style={GlobalStyles.title}>
					How many FULL <br />Pullups can you do?
				</Text>
			</View>
			<View style={GlobalStyles.body_Container}>
				<NumberButton />
				<Text style={styles.number}>8</Text>
				<NumberButton style={styles.triangleDown} />
			</View>
			<GoButton
				text="Go"
				style={styles.goButton}
				onPress={() => {
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
		lineHeight: 220,
		marginBottom: 20
	},
	triangleDown: {
		transform: [{ rotate: '180deg' }]
	}
});