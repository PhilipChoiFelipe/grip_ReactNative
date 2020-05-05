import * as React from 'react';

//design
import { GlobalStyles } from '../../../style/globalStyle';
import { Text, View } from 'react-native';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';
import { Ionicons } from '@expo/vector-icons';

//Stack Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../../screens/app/state/profile/profile';
import { CheckMax } from '../../../screens/app/state/profile/checkMax';
import { ChooseProgram } from '../../../screens/app/state/profile/chooseProgram';
import { ChangeWeek } from '../../../screens/app/state/profile/changeWeek/changeWeek';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { tabToggle } from '../../../modules/appState';

const Stack = createStackNavigator();

export const ProfileStack = ({ navigation }) => {
    let dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.userState.user.user
    }));
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                initialParams={{ user }}
                options={{
                    headerTitle: props => <CustomHeader {...props} title={user.auth.username} />,
                    ...HeaderStyle
                }}
            />
            <Stack.Screen
                name="CheckMax"
                component={CheckMax}
                initialParams={{ user }}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Pullup Count" />,
                    ...HeaderStyle,
                    headerLeft: () => (
                        <Ionicons
                            name="md-arrow-back"
                            size={35}
                            color="#333333"
                            onPress={() => {
                                dispatch(tabToggle());
                                navigation.navigate('ProfileScreen');
                            }}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="ChooseProgram"
                component={ChooseProgram}
                initialParams={{ user }}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Choose Program" />,
                    ...HeaderStyle
                }}
            />
            <Stack.Screen
                name="ChangeWeek"
                component={ChangeWeek}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Choose Week" />,
                    ...HeaderStyle,
                    headerLeft: () => (
                        <Ionicons
                            name="md-arrow-back"
                            size={35}
                            color="#333333"
                            onPress={() => {
                                dispatch(tabToggle());
                                navigation.navigate('ProfileScreen');
                            }}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};