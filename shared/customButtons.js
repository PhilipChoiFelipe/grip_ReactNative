import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export const NavButton = ({ text, onPress, style, visible }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button} />
            </TouchableOpacity>
        </View>
    );
};

export const EmptySpace = ({}) => {
    return (
        <View style={{ opacity: 0 }}>
            <View style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 60,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        borderTopColor: '#333333'
    }
});

export const GoButton = ({ text, onPress, style, visible }) => {
    return (
        <View style={ style }>
            <View style={gostyles.goButton}>
                <TouchableOpacity onPress={onPress}>
                    <View style={gostyles.button}>
                        <Text style={gostyles.buttonText}>{text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const gostyles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#333333',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Jockey-One',
        color: '#FFFFFF',
        fontSize: 30,
        // alignSelf: 'center',
        textAlign: 'center'
    },
    goButton: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const NumberButton = ({ text, onPress, style }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={onPress}>
                <View style={numberstyles.button} />
            </TouchableOpacity>
        </View>
    );
};

const numberstyles = StyleSheet.create({
    button: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 55,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#333333'
    }
});

export const RegisterButton = ({ text, onPress }) => {
    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            <TouchableOpacity onPress={onPress}>
                <View style={regstyles.button}>
                    <Text style={regstyles.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const regstyles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 20,
        // paddingVertical: 14,
        // paddingHorizontal: 10,
        // alignSelf: 'flex-start',
        backgroundColor: '#333333'
    },
    buttonText: {
        color: 'white',
        // textTransform: 'uppercase',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'IBMPlexSans-light'
    }
});