import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

//design
import { GoButton } from '../../shared/customButtons';
import { Card, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../style/globalStyle';
const color = {
    1: 'rgba(119, 128, 115, 0.8)',
    2: 'rgba(115, 128, 126, 0.8)',
    3: 'rgba(128, 89, 89, 0.8)',
    4: 'rgba(128, 115, 115, 0.8)',
    5: 'rgba(153, 110, 92, 0.8)'
};

//redux
import { useDispatch, useSelector } from 'react-redux';
import { chooseProgram } from '../../modules/userState';

export const ChooseProgram = ({ navigation }) => {
    const dispatch = useDispatch();
    const { chooseError, programs, stay } = useSelector(({ userState }) => ({
        chooseError: userState.chooseProgram.chooseError,
        programs: userState.updateMax.programs,
        stay: userState.updateMax.stay
    }));
    const [program, setProgram] = useState('');
	console.log(programs);
    return (
        <View style={GlobalStyles.container}>
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
                                    // console.log(program);
                                    // console.log(Math.floor(Math.random() * 5 + 1));
                                }}
                            >
                                <Card
                                    title={item.name}
                                    key={item.name}
                                    image={require('../../assets/images/images_pullup/pullup1.jpg')}
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
											color='#333333'
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
            <GoButton
                text="Go"
                onPress={() => {
					console.log("GO PROGRAM:", program);
                    dispatch(chooseProgram({programName: program, stay}));
					// navigation.navigate('ProfileScreen')
                }}
                style={{ marginVertical: '5%' }}
            />
        </View>
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