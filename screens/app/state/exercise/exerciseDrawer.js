import React, { useEffect } from 'react';

//design
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SummaryStyles } from '../../../../style/summaryStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setSet, setReset, drawerClose, tabToggle } from '../../../../modules/appState';

export const ExerciseDrawer = ({ program, navigation }) => {
    let dispatch = useDispatch();
    const handleNavToHome = () => {
        navigation.navigate('HomeScreen');
        dispatch(tabToggle());
		dispatch(drawerClose());
		dispatch(setReset());
    };
    const handlePress = index => {
        console.log(
            '%c DRAWER_CLICKED_SET:',
            'background: purple; color: white',
            program.set[index]
        );
        navigation.navigate('SetScreen');
        dispatch(setSet(index));
        dispatch(drawerClose());
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#D9D9D9',
            }}
        >
            <FlatList
                keyExtractor={(item, index) => index + ''}
                extraData={program.set}
                data={program.set}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={styles.block}
                            onPress={() => {
                                handlePress(index);
                            }}
                            key={index}
                        >
                            <Text style={styles.description}>{item.exercise}</Text>
                            <Text style={styles.reps}>{item.rep}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <View style={styles.icons}>
                <MaterialCommunityIcons
                    name="exit-run"
                    color="#333333"
                    size={40}
                    onPress={handleNavToHome}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	icons: {
		marginRight: 20,
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
    block: {
        // width: 270,
        padding: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(51, 51, 51, 0.75)'
    },
    description: {
        fontSize: 20,
        // fontFamily: 'IBMPlexSans-regular',
        fontFamily: 'IBMPlexSans-light',
        color: '#333333'
    },
    reps: {
        fontSize: 30,
        fontFamily: 'IBMPlexSans-regular',
        color: '#333333'
    }
});