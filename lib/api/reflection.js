import client from './client';

import React from 'react';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

export const getReflections = () => client.get('reflection/getReflections');

export const writeReflection = ({ memo, difficulty, nextWeek, programName, finishedSet, week, day }) =>
    client.post('reflection/writeReflection', { memo, difficulty, nextWeek, programName, finishedSet, week, day });

export const editReflection = ({ memo, difficulty, date }) => client.patch('reflection/editReflection', { memo, difficulty, date });

export const deleteReflection = ({ date }) => client.delete('reflection/deleteReflection', { data: { date} });



