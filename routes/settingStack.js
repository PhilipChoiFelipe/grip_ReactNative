import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CheckMax } from '../screens/setting/checkMax';
import { ChooseProgram } from '../screens/setting/chooseProgram';
import { GlobalStyles } from '../style/globalStyle';
import { HeaderStyle, CustomHeader } from '../style/headerStyle';
const Stack = createStackNavigator();

export const SettingStack = ({ userToken }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Check">
                <Stack.Screen
                    name="Check"
                    component={CheckMax}
					initialParams={{userToken: userToken}}
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