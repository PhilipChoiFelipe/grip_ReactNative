import React from 'react';

//design
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

const diffExplanation = [
    'This is warmup right?..',
    'Completed sets without single pause during sets',
    'Completed sets with satisfaction and challenge',
    'What a challenge. It took long time and several rests during sets',
    'It is too hard. Training is way challenging for me'
];

export const CreateRadio = (handleRadio, selected) => {
    let buttons = [];
    for (let i = 1; i < 6; i++) {
        buttons.push(
            <TouchableHighlight onPress={() => handleRadio(i)} style={{ borderRadius: 50 }} key={i}>
                <View
                    style={[
                        { borderRadius: 50, alignSelf: 'center' },
                        selected == i ? { backgroundColor: '#333333' } : {}
                    ]}
                >
                    <Text
                        style={[
                            {
                                fontFamily: 'IBMPlexSans-regular',
                                fontSize: 30,
                                paddingHorizontal: 15,
                                paddingVertical: 5
                            },
                            selected == i
                                ? {
                                      color: '#E6E6E6'
                                  }
                                : { color: '#333333' }
                        ]}
                    >
                        {i}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
    return buttons;
};

export const DifficultyRadio = ({handleRadio, selected}) => {
    return (
        <View style={styles.block}>
            <Text style={styles.block_description}>Difficulty</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flex: 1,
                    marginHorizontal: '5%'
                }}
            >
                {CreateRadio(handleRadio, selected)}
            </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
                <Text
                    style={{
                        color: '#333333',
                        fontFamily: 'IBMPlexSans-regular',
                        fontSize: 15
                    }}
                >
                    {diffExplanation[selected - 1]}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
		height: 200,
		marginHorizontal: '5%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(51, 51, 51, 0.75)'
    },
    block_description: {
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 15,
        color: '#333333',
        // lineHeight: 50,
        marginTop: 15,
        marginHorizontal: 15
    },
})