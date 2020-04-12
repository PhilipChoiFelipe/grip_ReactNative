import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Card, Divider, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';
import { ToggleView } from '../../../../shared/toggleView';
import { ProgressRing } from './progressRing';
import { DifficultyChart } from './difficultyChart';

const exercises = [
    {
        name: 'Warm Up',
        desc: ''
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    },
    {
        name: 'Pullup Try',
        desc: 'MAX / 1'
    }
];

export const TrainingSet = () => {
    return (
        <View style={GlobalStyles.container}>
            <View style={{ ...GlobalStyles.body_container, flex: 4, marginVertical: '20%', marginHorizontal: '5%' }} hide>
				<Text style={GlobalStyles.home_description}>Today's Training Set</Text>
                {exercises.map((exercise, index) => (
                    <ListItem
                        key={index}
                        title={exercise.name}
                        titleStyle={{ fontFamily: 'IBMPlexSans-light', fontSize: 15 }}
                        subtitle={exercise.desc}
                        containerStyle={{ backgroundColor: '#FFFFF0' }}
                        bottomDivider
                    />
                ))}
            </View>
        </View>
    );
};