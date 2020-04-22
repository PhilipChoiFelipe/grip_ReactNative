import client from './client';

import React from 'react';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

const STORAGE_KEY = Constants.installationId;

export const updateMax = ({ maxPullups }) => client.patch('/state/updateMax', { maxPullups });

export const chooseProgram = ({ programName, stay }) =>
    client.patch('state/decideProgram', { programName, stay });

export const check = async ({ userToken }) => {
	console.log('CHECK TOKEN:', userToken);
	let result = null;
    try {
        // const USER_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
        if (userToken) {
            client.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
            result = await client.get('state/check');
            console.log('CHECKED USER:', result.data);
        }
        return result;
    } catch (e) {
        return e;
    }
};

export const getProgram = () => client.get('session/getProgram');
