import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';
import { CheckMax } from '../../../screens/app/state/setting/checkMax';
import { ChooseProgram } from '../../../screens/app/state/setting/chooseProgram';
import { Text, View } from 'react-native';

//redux
// import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const SettingStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="CheckMax"
                    component={CheckMax}
                    options={{
                        headerTitle: props => <CustomHeader {...props} title="Pullup Count" />,
                        headerShown: false,
                        gestureEnabled: false,
                        ...HeaderStyle
                    }}
                />
                <Stack.Screen
                    name="ChooseProgram"
                    component={ChooseProgram}
                    initialParams={{ user }}
                    options={{
                        headerTitle: props => <CustomHeader {...props} title="Choose Program" />,
                        // headerShown: false,
                        // gestureEnabled: false,
                        ...HeaderStyle
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};