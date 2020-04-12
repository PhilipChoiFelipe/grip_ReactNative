import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DifficultyChart } from '../screens/app/state/home/difficultyChart';
import { ProgressRing } from '../screens/app/state/home/progressRing';
import { TrainingSet } from '../screens/app/state/home/trainingSet';

const Tab = createMaterialTopTabNavigator();


export const HomeTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="ProgressRing"
            tabBarOptions={{
                activeTintColor: '#333333',
				tabStyle: {top: 1},
                labelStyle: { fontSize: 12 },
				indicatorStyle:{ backgroundColor: 'none' },
                style: {top: 0, height: 0, position:'absolute', alignSelf: 'center'}
            }}
        >
			<Tab.Screen name="State" component={ProgressRing} />
			<Tab.Screen name="Set" component={TrainingSet}/>
            <Tab.Screen name="Difficulty" component={DifficultyChart}/>
        </Tab.Navigator>
    );
};