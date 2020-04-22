import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';
import { GoButton } from '../../../../shared/customButtons';

//redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getProgram, tabToggle } from '../../../../modules/state';

export const ProgressRing = ({ navigation }) => {
    let dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getProgram());
        },
        [dispatch]
    );
    const handleProgram = () => {
		dispatch(tabToggle());
        navigation.navigate('WarmupScreen');
    };

    let { user, loading, showTab } = useSelector(
        state => ({
            user: state.state.user.user,
			showTab: state.state.showTab,
            loading: state.loading.PROGRAM_LOADING
        }),
        shallowEqual
    );
    return (
        <View style={{ ...GlobalStyles.container, justifyContent: 'space-around' }}>
            <View style={{ flex: 5, marginTop: '10%' }}>
                <Text style={GlobalStyles.home_description}>Week Ring</Text>
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
        </View>
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

// export const ProgressRing = React.memo(progressRing);