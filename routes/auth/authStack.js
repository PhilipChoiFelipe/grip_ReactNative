import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoading from '../../screens/register/authLoading';
import LoginForm from '../../screens/register/logIn';

const Stack = createStackNavigator();

export const AuthStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="CheckMax">
				<Stack.Screen name="AuthLoading" component={AuthLoading} options={{headerShown: false}}/>
				<Stack.Screen name="LoginForm" component={LoginForm} options={{headerShown: false}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthStack;