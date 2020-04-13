import React, { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';

const AuthLoading = ({navigation}) => {
	setTimeout(() => {
		navigation.navigate('LoginForm');
	}, 5000);
	return(
		<View style={styles.titleContainer}>
			<Text style={styles.title}>
				GRIP
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FFFFF0'
	},
	title: {
		textAlign: 'center',
		fontSize: 130,
        letterSpacing: 10,
		fontFamily: 'Jockey-One',
		color: '#333333',
	}
});

export default AuthLoading;