import React, { useEffect, useState } from 'react';

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
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { BackgroundColors } from '../../../../assets/colors/backgroundColors';
import { DifficultyRadio } from '../../../../shared/difficultyRadio';
import { FontAwesome } from '@expo/vector-icons';

//util
import { Calendar } from 'react-native-calendars';
const _ = require('lodash');
import { objToArray } from '../../../../lib/objToArray';

//redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getReflections } from '../../../../modules/reflection';

export const ReflectionScreen = ({ route, navigation }) => {
    const { reflection } = route.params;
    console.log('REFLECTION_REFLECTION:', reflection);

    //RADIO BUTTON
    const [selected, setSelected] = useState(reflection.difficulty);
    const handleRadio = number => {
        console.log('%c SELECTED_DIFFICULTY:', 'background: purple; color: white', number);
        setSelected(number);
    };

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
                            <Text style={styles.pullupCount}>30</Text>
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
                                /*onChangeText={onChangeMemo}*/
                                defaultValue={reflection.memo}
                            />
                        </View>
                        <DifficultyRadio
                            handleRadio={handleRadio}
                            selected={selected}
                            defaultNumber={reflection.difficulty}
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