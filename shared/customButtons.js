import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

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

export const RegisterButton = ({ text, onPress, children }) => {
    return (
        <View
            style={{
				flexDirection: 'row',
                justifyContent: 'center',
				// flex: 1
					alignItems: 'stretch'
            }}
        >
            <TouchableOpacity onPress={onPress}>
                <View style={regstyles.button}>
                    <Text style={regstyles.buttonText}>{text}</Text>
					{children}
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
        backgroundColor: '#333333',
    },
    buttonText: {
        color: 'white',
        // textTransform: 'uppercase',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'IBMPlexSans-light'
    }
});

export const GoogleButton = ({ text, onPress, children }) => {
    return (
        <View
            style={{
				flexDirection: 'row',
                justifyContent: 'center',
				// flex: 1
					alignItems: 'stretch'
            }}
        >
            <TouchableOpacity onPress={onPress}>
                <View style={googlestyles.button}>
					{children}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const googlestyles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 30,
        backgroundColor: '#333333',
    },

});
