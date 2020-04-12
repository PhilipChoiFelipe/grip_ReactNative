import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {CheckMax} from '../screens/register/checkMax';
import {ChooseProgram} from '../screens/register/chooseProgram';
const Stack = createStackNavigator();

export const SettingStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="CheckMax">
				<Stack.Screen name="CheckMax" component={CheckMax} options={{headerShown: false}}/>
				<Stack.Screen name="ChooseProgram" component={ChooseProgram} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default SettingStack;