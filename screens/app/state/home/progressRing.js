import React, { useEffect } from 'react';

//design
import { Text, View, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { GlobalStyles } from '../../../../style/globalStyle';

export const ProgressRing = ({ user }) => {
    return (
        <View>
            <Text style={GlobalStyles.home_description}>Week {user.state.week} Ring</Text>
            {!user.state ? (
                <Text style={styles.ringText}> DAY 0 </Text>
            ) : (
                <Text style={styles.ringText}> DAY {user.state.day} </Text>
            )}
            <ProgressCircle
                style={{ height: 250, marginTop: '20%' }}
                progress={1 / 5 * user.state.day}
                progressColor={'#406680'}
                strokeWidth={25}
                animate={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
	ringText: {
        position: 'absolute',
        alignSelf: 'center',
        top: 170,
        fontSize: 70,
        color: '#333333',
        fontFamily: 'Jockey-One'
    }
});