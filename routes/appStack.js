import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './homeStack';
import { ProfileScreen } from '../screens/app/state/profile';
import { CalendarScreen } from '../screens/app/state/calendar';
import { SimpleLineIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const AppStack = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = 'fire'
						} else if (route.name === 'Profile') {
							iconName = 'user'
						} else {
							iconName = 'calendar'
						}

						// You can return any component that you like here!
						return <SimpleLineIcons name={iconName} size={size} color={color} />;
					}
				})}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray'
				}}
			>
				<Tab.Screen name="Profile" component={ProfileScreen} />
				<Tab.Screen name="Home" component={HomeStack} />
				<Tab.Screen name="Calendar" component={CalendarScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;