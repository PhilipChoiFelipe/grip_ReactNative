import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './home/homeStack';
import { ProfileStack } from './profile/profileStack';
import { CalendarStack } from './calendar/calendarStack';
import { CalendarScreen } from '../../screens/app/state/calendar';
import { SimpleLineIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppTab = () => {
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
				<Tab.Screen name="Profile" component={ProfileStack} />
				<Tab.Screen name="Home" component={HomeStack} />
				<Tab.Screen name="Calendar" component={CalendarStack} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppTab;