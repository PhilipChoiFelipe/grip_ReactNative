import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

//design
import { GoButton } from '../../../../shared/customButtons';
import { Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../../../style/globalStyle';
import { CreateAlert } from '../../../../shared/alert';

const color = {
    1: 'rgba(119, 128, 115, 0.8)',
    2: 'rgba(115, 128, 126, 0.8)',
    3: 'rgba(128, 89, 89, 0.8)',
    4: 'rgba(128, 115, 115, 0.8)',
    5: 'rgba(153, 110, 92, 0.8)'
};

//redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { chooseProgram } from '../../../../modules/userState';
import { tabToggle } from '../../../../modules/appState';

export const ChooseProgram = ({ navigation }) => {
    const dispatch = useDispatch();
    const { chooseError, programs, stay } = useSelector(
        ({ userState }) => ({
            chooseError: userState.chooseProgram.chooseError,
            programs: userState.updateMax.programs,
            stay: userState.updateMax.stay
        }),
        shallowEqual
    );

    const [program, setProgram] = useState(null);
    console.log('%c PROGRAM_NAMES', 'background: black; color: white');
    console.table(programs);

	//handle http error
	useEffect(() => {
		if(chooseError){
			console.log('%c CHOOSE_PROGRAM_ERROR:', 'background: red; color: white', chooseError);
		}
	}, [chooseError])
	
    const handleSubmit = e => {
        e.preventDefault();
        if (!program) {
            CreateAlert('Choose Program!', '');
        } else {
            console.log('%c CHOSEN_PROGRAM', 'background: black; color: white', program);
            dispatch(chooseProgram({ programName: program, stay }));
			dispatch(tabToggle());
            navigation.navigate('ProfileScreen');
        }
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={GlobalStyles.body_Container}>
                <FlatList
                    keyExtractor={item => item.name}
                    extraData={program}
                    data={programs}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setProgram(item.name);
                                }}
                            >
                                <Card
                                    title={item.name}
                                    key={item.name}
                                    image={require('../../../../assets/images/images_pullup/pullup1.jpg')}
                                    containerStyle={{
                                        backgroundColor: color[Math.floor(Math.random() * 5 + 1)],
                                        borderRadius: 20
                                    }}
                                    titleStyle={{
                                        color: '#333333',
                                        fontFamily: 'Jockey-One',
                                        alignSelf: 'flex-start',
                                        fontSize: 25,
                                        marginLeft: 10
                                    }}
                                >
                                    <View style={styles.card_descriptionContainer}>
                                        <Text style={styles.card_description}>
                                            {item.instruction}
                                        </Text>
                                        <Ionicons
                                            name="md-checkmark-circle"
                                            color="#333333"
                                            size={program == item.name ? 50 : 0}
                                        />
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <Divider
                style={{
                    marginTop: 5,
                    backgroundColor: 'rgba(51, 51, 51, 0.75)',
                    marginHorizontal: '5%'
                }}
            />
            <GoButton text="Go" onPress={handleSubmit} style={{ marginVertical: '5%' }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card_description: {
        fontFamily: 'IBMPlexSans-medium',
        color: '#333333',
        padding: 10
    },
    card_descriptionContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
        // textAlign:'center'
    }
});