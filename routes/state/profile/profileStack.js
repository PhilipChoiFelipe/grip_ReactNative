import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';
import { ProfileScreen } from '../../../screens/app/state/profile'
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Minseok Choi"/>,
                    ...HeaderStyle
                }}
            />
        </Stack.Navigator>
    );
};
