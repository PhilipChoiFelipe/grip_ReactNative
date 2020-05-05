import React, { useEffect } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getProgram } from '../../../../modules/userState';
import { tabToggle } from '../../../../modules/appState';
import { getReflections } from '../../../../modules/reflection';

export const ProgressRing = ({ navigation }) => {
    let dispatch = useDispatch();
	
    const handleProgram = () => {
        dispatch(tabToggle());
        navigation.navigate('WarmupScreen');
    };

    const { user, program, reflections } = useSelector(
        state => ({
			reflections: state.reflection.reflections,
            user: state.userState.user.user,
            program: state.userState.program.program
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

    useEffect(() => {
        if (!reflections) {
            dispatch(getReflections());
        }
    }, [dispatch, reflections]);

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

    return (
        <SafeAreaView style={{ ...GlobalStyles.container, justifyContent: 'space-around' }}>
            <View style={{ flex: 5, marginTop: '10%' }}>
                <Text style={GlobalStyles.home_description}>Week {user.state.week} Ring</Text>
                {!user.state ? (
                    <Text style={styles.ringText}> DAY 0 </Text>
                ) : (
                    <Text style={styles.ringText}> DAY {user.state.day} </Text>
                )}
                <ProgressCircle
                    style={{ height: 250, marginTop: '10%' }}
                    progress={1 / 5 * user.state.day}
                    progressColor={'#805959'}
                    strokeWidth={25}
                    animate={true}
                />
            </View>
            <GoButton text="Pull" style={{ bottom: '5%' }} onPress={handleProgram} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ringText: {
        position: 'absolute',
        alignSelf: 'center',
        top: '38%',
        fontSize: 70,
        color: '#333333',
        fontFamily: 'Jockey-One'
    }
});