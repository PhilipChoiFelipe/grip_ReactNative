import client from './client';

//
import React from 'react';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

const STORAGE_KEY = Constants.installationId;

export const autoLogin = async () => {
	try{
		let token = await AsyncStorage.getItem(STORAGE_KEY);
		console.log('TOKEN IN AUTO:', token);
		if(!token){
			throw new Error('Token Not Found in Storage');
		}
		return {data: token};
	}catch(e){
		return e;
	}
}

//login
export const logIn = async ({ email, password }) => {
	const result = await client.post('/auth/logIn', { email, password });
	try {
		console.log("AXIOS LOGIN TOKEN:", result.data.jwtToken);
        await AsyncStorage.setItem(STORAGE_KEY, result.data.jwtToken);
		return {data: result.data.jwtToken};
    } catch (e) {
        return e;
    }
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
        return {data: {logout: true}};
    } catch (e) {
        return e;
    }
};