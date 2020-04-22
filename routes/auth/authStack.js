import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthLoading } from '../../screens/register/authLoading';
import { AuthForm } from '../../screens/register/authForm';

// const Stack = createStackNavigator();
//				<Stack.Screen name="AuthLoading" component={AuthLoading} options={{headerShown: false}}/>

export const AuthStack = ({Stack}) => {
	return (
			// <Stack.Navigator initialRouteName="CheckMax">
				<Stack.Screen name="AuthForm" component={AuthForm} options={{headerShown: false, gestureEnabled: false}} />
			// </Stack.Navigator>
	);
};

export default AuthStack;