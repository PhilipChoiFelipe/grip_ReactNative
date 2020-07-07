import React, { useEffect, useState } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet, Dimensions, Vibration } from 'react-native';
// import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';
// import LottieView from 'lottie-react-native';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { tabToggle, drawerClose } from '../../../../modules/appState';

//timer
// import { Timer } from 'react-native-stopwatch-timer';
import { Timer } from '../../../../lib/timer/react-native-stopwatch-timer';

// //util
// import Drawer from 'react-native-drawer';
// import { ExerciseDrawer } from './exerciseDrawer';

//Vibration
const PATTERN = [1000, 1500, 1000];

export const RestScreen = ({ navigation, route }) => {
    // let dispatch = useDispatch();
    const [start, setStart] = useState(true);
    const [reset, setReset] = useState(false);
    const screenWidth = Math.round(Dimensions.get('window').width);

    const handleFinish = (vibrate) => {
		if(vibrate == true){
            Vibration.vibrate(PATTERN);
		}
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
	
	//Set Description 
	const descNumber = Math.floor(Math.random() * (program['exercise_description'].length - 1));
	console.log(descNumber);
	
    const { currentSet } = useSelector(
        state => ({
            currentSet: state.appState.currentSet
        }),
        shallowEqual
    );
    // useEffect(() => {
    // 	console.log('%c REST_NEXT_SET:', 'background: purple; color: white', );
    // })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.tipText}>{program['exercise_description'][descNumber]}</Text>
                {
                    <Timer
                        start={start}
                        reset={reset}
                        handleFinish={()=>handleFinish(true)}
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
                                // marginLeft: '8%'
                                alignSelf: 'center'
                            }
                        }}
                        totalDuration={120000}
                    />
                }
				<View style={{height: 150}}>
                	<GoButton text="PULL" onPress={()=>handleFinish(false)} style={{ top: 40 }} />
				</View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tipText: {
        fontFamily: 'Jockey-One',
        fontSize: 25,
        color: '#333333',
        marginHorizontal: '10%',
        marginTop: '5%'
    }
});