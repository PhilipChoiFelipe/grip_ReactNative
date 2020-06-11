import React, { useEffect } from 'react';

//design
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';
import { AntDesign } from '@expo/vector-icons';



//components
import { ProgressRing } from './progressRing';
import { DifficultyChart } from './difficultyChart';
import { TrainingSet } from './trainingSet';
import { LoadingScreen } from '../loading';

//redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getProgram } from '../../../../modules/userState';
import { tabFalse, tabTrue } from '../../../../modules/appState';
import { getReflections } from '../../../../modules/reflection';

export const HomeScreen = ({ navigation }) => {
	//scroll pagination height 
	const height = Dimensions.get('window').height * 0.7;

    let dispatch = useDispatch();

	//handle Scroll
	const handleScroll = e => {
		let scrollY = e.nativeEvent.contentOffset.y;
 		// console.log(scrollY);
		// console.log(height);
		if(scrollY <= 0){
			dispatch(tabTrue());
		}
	}
	
    const handleProgram = () => {
        dispatch(tabFalse());
        navigation.navigate('WarmupScreen');
    };

    const { user, program, reflections, programLoading, userLoading } = useSelector(
        state => ({
            reflections: state.reflection.reflections,
            user: state.userState.user.user,
            program: state.userState.program.program,
            programLoading: state.loading['userState/PROGRAM'],
			userLoading: state.loading['userState/CHECK']
        }),
        shallowEqual
    );
    useEffect(
        () => {
            if (!program) {
                dispatch(getProgram());
            }
        },
        [dispatch, program]
    );

    useEffect(
        () => {
            if (!reflections) {
                dispatch(getReflections());
            }
        },
        [dispatch, reflections]
    );

    useEffect(
        () => {
            console.log('%c PROGRESS_RING:', 'background: black; color: white');
            console.log('USER_STATE:');
            console.table(user.state);
            if (program) {
                console.log('PROGRAM:');
                console.table(program.set);
            }
        },
        [user, program]
    );

    if ((!program || programLoading == true) || (!user || userLoading == true)) {
        console.log('LOADING');
        return <LoadingScreen />;
    } else {
        return (
            <SafeAreaView style={{ ...GlobalStyles.container, justifyContent: 'space-around' }}>
                <ScrollView
                    style={{ flex: 1 }}
                    snapToOffsets={[0, height, (height) * 2 + 50]}
					decelerationRate='fast'
                    onScrollBeginDrag={() => dispatch(tabFalse())}
                    onScroll={handleScroll}
                >
                    <View style={{ ...styles.block, marginTop: '10%', height: height, marginHorizontal: '5%'}}>
                        <ProgressRing user={user} />
                    </View>
                    <View style={{...styles.block, height: height, marginHorizontal: '5%' }}>
                        <TrainingSet program={program} />
                    </View>
                    <View style={{...styles.block, height: height + 50, marginHorizontal: '5%' }}>
                        <DifficultyChart />
                    </View>
                </ScrollView>
                <GoButton text="Pull" onPress={handleProgram} style={{ bottom: 10, position: 'absolute', alignSelf:'center' }} />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    block: {
		// justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: '10%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
});