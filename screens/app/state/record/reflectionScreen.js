import React, { useEffect, useState, useCallback } from 'react';

//design
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { DifficultyRadio } from '../../../../shared/difficultyRadio';
import { GoButton } from '../../../../shared/customButtons';
import { FontAwesome } from '@expo/vector-icons';

//util
import { Calendar } from 'react-native-calendars';
const _ = require('lodash');
import { objToArray } from '../../../../lib/objToArray';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    getReflections,
    changeField,
    editTrue,
    editFalse,
    editReflection
} from '../../../../modules/reflection';
import { tabToggle } from '../../../../modules/appState';

export const ReflectionScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const { reflection } = route.params;

    const { memo, difficulty, edit } = useSelector(
        state => ({
            memo: state.reflection.reflectionElements.memo,
            difficulty: state.reflection.reflectionElements.difficulty,
            edit: state.reflection.reflectionElements.edit
        }),
        shallowEqual
    );

    const handleEdittedReflection = e => {
        e.preventDefault();
        if (reflection.memo != memo || reflection.difficulty != difficulty) {
            dispatch(editReflection({ memo, difficulty, date: reflection.finishedDate }));
        }
        dispatch(tabToggle());
        navigation.pop(1);
    };

    const handleMemo = text => {
        dispatch(changeField({ key: 'memo', value: text }));
    };

    useEffect(() => {
        console.log('REFLECTION_REFLECTION:');
        console.table(reflection);
        if (reflection.memo != memo) {
            dispatch(changeField({ key: 'memo', value: reflection.memo }));
        }
        if (difficulty != reflection.difficulty) {
            dispatch(changeField({ key: 'difficulty', value: reflection.difficulty }));
        }
    }, []);

    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#F2F2F2' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ flex: 1 }}>
                    {/*<Modal visible={modalOpen} animationType="slide">
                <MemoScreen toggleModal={toggleModal}/>
            </Modal>*/}
                    <View style={SummaryStyles.title_Container}>
                        <View>
                            <Text style={SummaryStyles.title}>WEEK {reflection.week}</Text>
                            <Text style={SummaryStyles.subtitle}>{reflection.programName}</Text>
                        </View>
                        <View>
                            <Text style={SummaryStyles.finishedDate}>
                                {reflection.formattedDate}
                            </Text>
                            <Text style={SummaryStyles.currentDate}>DAY - {reflection.day}</Text>
                        </View>
                    </View>
                    <View style={SummaryStyles.body_container}>
                        <View style={styles.block}>
                            <Text style={styles.block_description}>Pullups Done:</Text>
                            <Text style={styles.pullupCount}>{reflection.pullupCount}</Text>
                        </View>
                        <View style={styles.block}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.block_description}>Memo</Text>
                                <View style={{ margin: '5%' }}>
                                    <FontAwesome name="plus" color="#333333" size={20} />
                                </View>
                            </View>
                            <TextInput
                                placeholder="Hows your pull?"
                                multiline={true}
                                style={styles.textInput}
                                onChangeText={handleMemo}
                                defaultValue={reflection.memo}
                            />
                        </View>
                        <DifficultyRadio defaultNumber={reflection.difficulty} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <GoButton
                            text="Done"
                            onPress={handleEdittedReflection}
                            style={{ bottom: 10 }}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    block: {
        height: 200,
        marginHorizontal: '5%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(51, 51, 51, 0.75)'
    },
    pullupText: {
        fontFamily: 'Jockey-One',
        fontSize: 25,
        color: '#333333'
    },
    pullupCount: {
        fontFamily: 'Jockey-One',
        fontSize: 110,
        color: '#333333',
        alignSelf: 'center'
    },
    block_description: {
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 15,
        color: '#333333',
        // lineHeight: 50,
        marginTop: 15,
        marginHorizontal: 15
    },
    textInput: {
        flexDirection: 'row',
        color: '#333333',
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 18,
        marginHorizontal: 15
    }
});