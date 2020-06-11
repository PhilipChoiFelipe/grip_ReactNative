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
    Keyboard,
	ScrollView
} from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { GoButton } from '../../../../shared/customButtons';
import { FontAwesome } from '@expo/vector-icons';
import { DifficultyRadio } from '../../../../shared/difficultyRadio';
import { CreateAlert } from '../../../../shared/alert';
// import { MemoScreen } from './memoScreen';

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeField } from '../../../../modules/reflection';
import { writeReflection, getReflections } from '../../../../modules/reflection';

export const SummaryScreen = ({ navigation, route }) => {
    //check memo and difficulty
    const { memo, difficulty } = useSelector(
        state => ({
            memo: state.reflection.reflectionElements.memo,
            difficulty: state.reflection.reflectionElements.difficulty
        }),
        shallowEqual
    );

    //Toggle Modal
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    //set memo
    const onChangeMemo = text => {
        dispatch(changeField({ key: 'memo', value: text }));
    };

    //format current use data to submit
    const { user, program } = route.params;
    const { week, day } = user.state;
    const programName = user.state.program;
    const { shortenedSet, pullupCount } = program;

    //HANDLE WRITE REFLECTION BUTTON (UPDATES USER state in redux)
    const handleReflection = () => {
        if (!memo || !difficulty) {
            CreateAlert('Write Memo and Press Difficulty!');
        } else {
            dispatch(
                writeReflection({
                    memo: memo,
                    difficulty: difficulty,
                    programName: programName,
                    finishedSet: shortenedSet + '',
                    week: week,
                    day: day,
					pullupCount: pullupCount,
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
	console.log('PULLUP_COUNT:', pullupCount);
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, backgroundColor: '#F2F2F2' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ flex: 1 }}>
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
                            <Text style={styles.block_description}>Pullups Done:</Text>
                            <Text style={styles.pullupCount}>{pullupCount}</Text>
                        </View>
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
                        <DifficultyRadio />
                    </View>
                    <GoButton text="NEXT" onPress={handleReflection} style={{ flex: 1, marginTop: '5%' }} />
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
    }
});