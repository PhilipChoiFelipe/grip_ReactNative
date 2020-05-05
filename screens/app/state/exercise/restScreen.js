import React, { useEffect, useState } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { tabToggle, drawerClose } from '../../../../modules/appState';

//timer
import { Timer } from 'react-native-stopwatch-timer';

//util
import Drawer from 'react-native-drawer';
import { ExerciseDrawer } from './exerciseDrawer';

export const RestScreen = ({ navigation, route }) => {
    let dispatch = useDispatch();
    const [start, setStart] = useState(true);
    const [reset, setReset] = useState(false);
    const screenWidth = Math.round(Dimensions.get('window').width);

    const handleFinish = () => {
        setStart(false);
        setReset(true);
        navigation.navigate('SetScreen');
    };
    let program = route.params.program;
    // To implement, instant dispatch.
    // useEffect(
    //     () => {
    //         dispatch(tabToggle());
    //     },
    //     [dispatch]
    // );
    // const { showDrawer } = useSelector(
    //     state => ({
    //         showDrawer: state.appState.toggle.showDrawer
    //     }),
    //     shallowEqual
    // );
	// useEffect(() => {
	// 	console.log('%c REST_NEXT_SET:', 'background: purple; color: white', );		
	// })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={GlobalStyles.title}>THIS IS REST SCREEN</Text>
                {
                    <Timer
                        start={start}
                        reset={reset}
                        handleFinish={handleFinish}
                        options={{
                            container: {
                                width: screenWidth,
                                backgroundColor: '#F2F2F2',
                                // padding: 20,
                                borderRadius: 5
                            },
                            text: {
                                fontSize: 100,
                                color: '#333333',
                                fontFamily: 'Jockey-One',
                                marginLeft: '8%'
                            }
                        }}
                        totalDuration={10000}
                    />
                }
            </View>
            <GoButton text="PULL" onPress={handleFinish} style={{ margin: '10%' }} />
        </SafeAreaView>
    );
};