import client from './client';

import React from 'react';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

const STORAGE_KEY = Constants.installationId;

export const updateMax = ({ maxPullups }) => client.patch('/state/updateMax', { maxPullups });

export const chooseProgram = ({ programName, stay }) =>
    client.patch('state/decideProgram', { programName, stay });

export const check = async ({ userToken }) => {        // const USER_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
        if (userToken) {
            client.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
            const result = await client.get('state/check');
			return result;
        }else{
			throw new Error('NO USER_TOKEN FOUND to authenticate current user');
		}
};

export const getProgram = () => client.get('session/getProgram');

export const getWeeks = () => client.get('state/getWeeks');

export const selectWeek = ({ selectedWeek }) => client.patch('state/selectWeek', {selectedWeek});

export const nextWeek = ({ nextWeek }) => client.patch('state/nextWeek', {nextWeek});