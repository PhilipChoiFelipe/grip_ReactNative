import React, { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../style/globalStyle';
import { useSelector } from 'react-redux';

export const AuthLoading = ({ navigation }) => {
	const { checkLoading, authLoading, auth, user} = useSelector(state => ({
		authLoading: state.loading['auth/AUTOLOGIN'],
		checkLoading: state.loading['state/CHECK'],
        user: state.userState.user.user,
        auth: state.auth.auth.auth,

    }));
	if(!authLoading && !checkLoading){
		if(user && auth){
			navigation.navigate('App');
		}else{
			navigation.navigate('AuthForm');
		}	
	}
	return(
		<View style={styles.titleContainer}>
			<Text style={styles.title}>
				GRIP
			</Text>
			<Text style={{...GlobalStyles.home_state, bottom: 25, textAlign: 'center', letterSpacing: 5}}>Pull yourself against gravity</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#E6E6E6'
	},
	title: {
		textAlign: 'center',
		fontSize: 130,
        letterSpacing: 10,
		fontFamily: 'Jockey-One',
		color: '#333333',
	}
});
