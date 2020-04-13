import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeTab } from './homeTab';
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle } from '../../../style/headerStyle';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeTab}
                options={{
                    headerTitle: props => <CustomHeader {...props} />,
                    ...HeaderStyle
                }}
            />
        </Stack.Navigator>
    );
};

const CustomHeader = () => {
    return (
            <View>
                <Text style={GlobalStyles.home_state}>Current Program:</Text>
                <Text style={GlobalStyles.title}>Make one count</Text>
            </View>
    );
};
