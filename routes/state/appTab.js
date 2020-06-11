import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HomeStack } from './home/homeStack';
import { ProfileStack } from './profile/profileStack';
import { RecordStack } from './record/recordStack';
import { SimpleLineIcons } from '@expo/vector-icons';

//redux
import { useSelector, shallowEqual } from 'react-redux';

const Tab = createBottomTabNavigator();

const AppTab = ({ user }) => {
	const { showTab } = useSelector(state => ({
        showTab: state.appState.toggle.showTab,
    }), shallowEqual);
	return (
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
					},
				})}
				tabBarOptions={{
					activeTintColor: '#EE5F5F',
					inactiveTintColor: 'gray',
					
					// tabStyle: {backgroundColor: '#B3B3B3'}
				}}
			>
				<Tab.Screen name="Profile" component={ProfileStack} options={{tabBarVisible: showTab}}/>
				<Tab.Screen name="Home" component={HomeStack} options={{tabBarVisible: showTab}} />
				<Tab.Screen name="History" component={RecordStack} options={{tabBarVisible: showTab}} />
			</Tab.Navigator>
	);
};

export default AppTab;