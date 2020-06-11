import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
// import { HomeTab } from './homeTab';
import { HomeScreen } from '../../../screens/app/state/home/homeScreen';
import { GraphScreen } from '../../../screens/app/state/exercise/graphScreen';
import { RestScreen } from '../../../screens/app/state/exercise/restScreen';
import { SetScreen } from '../../../screens/app/state/exercise/setScreen';
import { SummaryScreen } from '../../../screens/app/state/exercise/summaryScreen';
import { WarmupScreen } from '../../../screens/app/state/exercise/warmupScreen';
import { DoneScreen } from '../../../screens/app/state/exercise/doneScreen';

//design
import { GlobalStyles } from '../../../style/globalStyle';
import { HeaderStyle } from '../../../style/headerStyle';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BackgroundColors } from '../../../assets/colors/backgroundColors';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { tabToggle, drawerToggle } from '../../../modules/appState';

const Stack = createStackNavigator();

export const HomeStack = ({ navigation }) => {
    let colorLength = BackgroundColors.length;
    let backgroundColor = BackgroundColors[Math.floor(Math.random() * (colorLength - 1))];
    let dispatch = useDispatch();
    const { user, program, currentSet } = useSelector(
        state => ({
            user: state.userState.user.user,
            program: state.userState.program.program,
			currentSet: state.appState.currentSet
        }),
        shallowEqual
    );
    const handleExit = () => {
        dispatch(tabToggle());
        navigation.navigate('HomeScreen');
    };
    const openDrawer = () => {
        dispatch(drawerToggle());
    }; 
    return (
        <Stack.Navigator>	
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: props => (
                        <CustomHeader
                            {...props}
                            title={user.state ? user.state.program : `choose program in profile`}
                        />
                    ),
                    ...HeaderStyle
                }}
            />
            <Stack.Screen
                name="WarmupScreen"
                component={WarmupScreen}
                initialParams={{ program }}
                options={{
                    headerTitle: props => <ExerciseHeader {...props} title="WarmUp" />,
                    headerLeft: null,
                    gestureEnabled: false,
                    ...HeaderStyle,
                    headerStyle: { height: 75, backgroundColor: backgroundColor },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            color="#333333"
                            size={40}
                            onPress={openDrawer}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="SetScreen"
                component={SetScreen}
                initialParams={{ program }}
                options={{
                    headerTitle: props => <ExerciseHeader {...props} title={program.set[currentSet].exercise} />,
                    headerLeft: null,
                    gestureEnabled: false,
                    ...HeaderStyle,
                    headerStyle: { height: 75, backgroundColor: backgroundColor },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="format-list-bulleted"
                            color="#333333"
                            size={40}
                            onPress={openDrawer}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="RestScreen"
                component={RestScreen}
                initialParams={{ program }}
                options={{
                    headerTitle: props => <ExerciseHeader {...props} title="Rest" />,
                    headerLeft: null,
                    gestureEnabled: false,
                    ...HeaderStyle,
                    headerStyle: { height: 75, backgroundColor: backgroundColor }
                }}
            />
            <Stack.Screen
                name="DoneScreen"
                component={DoneScreen}
                initialParams={{ backgroundColor }}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="GOOD JOB" />,
                    headerLeft: null,
                    gestureEnabled: false,
                    ...HeaderStyle,
                    headerStyle: { height: 75, backgroundColor: backgroundColor }
                }}
            />
            <Stack.Screen
                name="SummaryScreen"
                initialParams={{ user, program }}
                component={SummaryScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="GraphScreen"
                component={GraphScreen}
                initialParams={{ backgroundColor, user }}
                options={{
                    headerShown: false,
                    headerStyle: { height: 75, backgroundColor: backgroundColor }
                }}
            />
        </Stack.Navigator>
    );
};

const CustomHeader = ({ title }) => {
    return (
        <View>
            {/*<Text style={GlobalStyles.home_state}>Current Program:</Text>*/}
            <Text style={GlobalStyles.title}>{title}</Text>
        </View>
    );
};

const ExerciseHeader = ({ title }) => {
    return (
        <View>
            <Text style={GlobalStyles.title}>{title}</Text>
        </View>
    );
};

// export const HomeStack = React.memo(homeStack);