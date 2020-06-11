import React from 'react';

//design
import { GlobalStyles } from '../../../style/globalStyle';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderStyle, CustomHeader } from '../../../style/headerStyle';

//redux
import { useDispatch } from 'react-redux';
import { tabToggle } from '../../../modules/appState';
import { editReflection } from '../../../modules/reflection';

//navigation
import { createStackNavigator } from '@react-navigation/stack';
import { RecordScreen } from '../../../screens/app/state/record/record';
import { ReflectionScreen } from '../../../screens/app/state/record/reflectionScreen';

const Stack = createStackNavigator();

export const RecordStack = ({navigation}) => {
    let dispatch = useDispatch();
	
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Record"
                component={RecordScreen}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Your History" />,
                    ...HeaderStyle
                }}
            />
            <Stack.Screen
                name="Reflection"
                component={ReflectionScreen}
                options={{
                    headerTitle: props => <CustomHeader {...props} title="Takeaway" />,
                    ...HeaderStyle,
                    headerLeft: () => (
                        <Ionicons
                            name="md-arrow-back"
                            size={35}
                            color="#333333"
                            onPress={() => {
								// handleEdittedReflection();
                                dispatch(tabToggle());
								navigation.navigate('Record');
                            }}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};

// export const CalendarStack = React.memo(calendarStack);