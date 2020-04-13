import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';
import { CalendarScreen } from '../../../screens/app/state/calendar'
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export const CalendarStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Your History"/>,
                    ...HeaderStyle
                }}
            />
        </Stack.Navigator>
    );
};

