import client, { handleError } from './client';

//
import React from 'react';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

const STORAGE_KEY = Constants.installationId;

export const autoLogin = async () => {
		let token = await AsyncStorage.getItem(STORAGE_KEY);
		if(!token){
			return new Error('Token Not Found in Storage');
		}else{
			return {data: token, config: 'AUTO_LOGIN: Find saved USER_TOKEN from AsyncStorage'};	
		}
}

//login
export const logIn = async ({ email, password }) => {
	// handleError(result);
		const response = await client.post('/auth/logIn', { email, password });
        await AsyncStorage.setItem(STORAGE_KEY, response.data.jwtToken);
		return response;
    // asyncPutUserToken(response.jwtToken);
};

//signUp
export const signUp = ({ username, email, password }) => {
    const response = client.post('/auth/signUp', { username, email, password });
    asyncPutUserToken(response.jwtToken);
    return response;
};

export const logOut = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return {data: 'user logout successful', config: 'LOGOUT: Remove existing USER_TOKEN in AsyncStorage'};
    } catch (e) {
        return e;
    }
};