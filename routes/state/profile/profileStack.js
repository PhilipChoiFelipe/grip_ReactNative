import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';
import { ProfileScreen } from '../../../screens/app/state/profile/profile'
import { CheckMax } from '../../../screens/app/state/profile/checkMax';
import { ChooseProgram } from '../../../screens/app/state/profile/chooseProgram';
import { Text, View } from 'react-native';

//redux 
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const ProfileStack = () => {
	const { user } = useSelector(state => ({
        user: state.state.user.user,
    }));
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
				initialParams={{ user }}
                options={{
                    headerTitle: props => <CustomHeader {...props} title={user.auth.username}/>,
                    ...HeaderStyle
                }}
            />
			<Stack.Screen
				name="CheckMax"
				component={CheckMax}
				initialParams={{ user }}
				options={{
					headerTitle: props => <CustomHeader {...props} title="Pullup Count"/>,
					...HeaderStyle
				}}
			/>
			<Stack.Screen
				name="ChooseProgram"
				component={ChooseProgram}
				initialParams={{ user }}
				options={{
					headerTitle: props => <CustomHeader {...props} title="Choose Program"/>,
					...HeaderStyle
				}}
			/>
        </Stack.Navigator>
    );
};

