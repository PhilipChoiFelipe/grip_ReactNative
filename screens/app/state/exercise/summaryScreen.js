import React, { useEffect, useState } from 'react';

//design
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { GoButton } from '../../../../shared/customButtons';
import { FontAwesome } from '@expo/vector-icons';
import { DifficultyRadio } from '../../../../shared/difficultyRadio';
import { CreateAlert } from '../../../../shared/alert';
// import { MemoScreen } from './memoScreen';

//redux
import { useDispatch, useSelector } from 'react-redux';
// import { tabToggle } from '../../../../modules/appState';
import { writeReflection, getReflections } from '../../../../modules/reflection';

export const SummaryScreen = ({ navigation, route }) => {
    //Toggle Modal
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    //set memo
    const [memo, setMemo] = useState('');
    const onChangeMemo = text => {
        setMemo(text);
    };

    //RADIO BUTTON
    const [selected, setSelected] = useState(null);

    const handleRadio = number => {
        console.log('%c SELECTED_DIFFICULTY:', 'background: purple; color: white', number);
        setSelected(number);
    };

    //format current use data to submit
    const { user, program } = route.params;
    const { week, day } = user.state;
    const programName = user.state.program;
    const { shortenedSet } = program;

    //HANDLE WRITE REFLECTION BUTTON (UPDATES USER state in redux)
    const handleReflection = () => {
        if (!memo || !selected) {
            CreateAlert('Write Memo and Press Difficulty!');
        } else {
            dispatch(
                writeReflection({
                    memo: memo,
                    difficulty: selected,
                    programName: programName,
                    finishedSet: shortenedSet + '',
                    week: week,
                    day: day
                })
            );
            navigation.navigate('GraphScreen');
        }
        // console.log('%c REFLECTION_CONTENT:', 'background: black; color: white');
        // console.table({
        //     memo: 'good exercise',
        //     difficulty: selected,
        //     programName,
        //     finishedSet: shortenedSet,
        //     week,
        //     day
        // });
    };

    let dispatch = useDispatch();

    //To implment, instant dispatch.
    // useEffect(
    //     () => {
    //         dispatch(tabToggle());
    //     },
    //     [dispatch]
    // );

    //format completed exercise date
    const date = new Date();
    const formatDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#F2F2F2' }}>
                {/*<Modal visible={modalOpen} animationType="slide">
                <MemoScreen toggleModal={toggleModal}/>
            </Modal>*/}
                <View style={SummaryStyles.title_Container}>
                    <View>
                        <Text style={SummaryStyles.title}>WEEK {user.state.week}</Text>
                        <Text style={SummaryStyles.subtitle}>{user.state.program}</Text>
                    </View>
                    <View>
                        <Text style={SummaryStyles.finishedDate}>{formatDate}</Text>
                        <Text style={SummaryStyles.currentDate}>DAY - {user.state.day}</Text>
                    </View>
                </View>
                <View style={SummaryStyles.body_container}>
                    <View style={styles.block}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.block_description}>Memo</Text>
                            <View style={{ margin: '5%' }}>
                                <FontAwesome
                                    name="plus"
                                    color="#333333"
                                    size={20}
                                    onPress={toggleModal}
                                />
                            </View>
                        </View>
                        <TextInput
                            placeholder="Hows your pull?"
                            multiline={true}
                            style={styles.textInput}
                            onChangeText={onChangeMemo}
                        />
                    </View>
                    <DifficultyRadio handleRadio={handleRadio} selected={selected} />
                </View>
                <GoButton text="NEXT" onPress={handleReflection} style={{ margin: '5%' }} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
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
    textInput: {
        flexDirection: 'row',
        color: '#333333',
        fontFamily: 'IBMPlexSans-regular',
        fontSize: 18,
        marginHorizontal: 15
    }
});