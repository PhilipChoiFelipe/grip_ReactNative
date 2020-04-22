import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../../style/globalStyle';
import { useSelector } from 'react-redux';

export const LoadingScreen = ( ) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>GRIP</Text>
            <Text
                style={{
                    ...GlobalStyles.home_state,
                    bottom: 25,
                    textAlign: 'center',
                    letterSpacing: 5
                }}
            >
                Pull yourself against gravity
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E6E6E6'
    },
    title: {
        textAlign: 'center',
        fontSize: 130,
        letterSpacing: 10,
        fontFamily: 'Jockey-One',
        color: '#333333'
    }
});