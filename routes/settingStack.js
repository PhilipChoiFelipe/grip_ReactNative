import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CheckMax } from '../screens/register/checkMax';
import { ChooseProgram } from '../screens/register/chooseProgram';
import { GlobalStyles } from '../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../style/headerStyle';
const Stack = createStackNavigator();

export const SettingStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CheckMax">
                <Stack.Screen
                    name="CheckMax"
                    component={CheckMax}
                    options={{
                        headerTitle: props => (
                            <CustomHeader {...props} title="Full Pullups Count" />
                        ),
                        ...HeaderStyle
                    }}
                />
                <Stack.Screen
                    name="ChooseProgram"
                    component={ChooseProgram}
                    options={{
                        headerTitle: props => (
                            <CustomHeader {...props} title="ChooseProgram" />
                        ),
						...HeaderStyle
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default SettingStack;