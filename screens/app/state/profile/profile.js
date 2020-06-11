import React, { useState, useEffect } from 'react';

//design
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SimpleLineIcons } from '@expo/vector-icons';
import { RegisterButton } from '../../../../shared/customButtons';

//redux
import { logout } from '../../../../modules/auth';
import { check, getWeeks, resetMax } from '../../../../modules/userState';
import { tabToggle, tabTrue } from '../../../../modules/appState';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const profileScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleProgram = e => {
        e.preventDefault();
        dispatch(tabToggle());
        navigation.navigate('ChooseProgram');
    };

    const handleMax = e => {
        e.preventDefault();
        dispatch(tabToggle());
        navigation.navigate('CheckMax');
        dispatch(resetMax());
    };

    const handleWeek = e => {
        e.preventDefault();
        dispatch(getWeeks());
        dispatch(tabToggle());
        navigation.navigate('ChangeWeek');
    };

    let dispatch = useDispatch();
    let { user } = useSelector(
        state => ({
            user: state.userState.user.user
        }),
        shallowEqual
    );
    let state = user.state;

    useEffect(() => {
        console.log('%c PROFILE_USER_STATE', 'background: black; color: white');
        console.table(user.state);
    });

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <View>
                            <Text style={GlobalStyles.home_state}>Current Program:</Text>
                            <Text style={GlobalStyles.title}>
                                {state ? state.program : 'Choose Program'}
                            </Text>
                        </View>
                        <SimpleLineIcons name="settings" size={30} onPress={handleProgram} />
                    </View>
                </View>
                <Divider />
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20, width: 125 }}>
                            Current Week:
                        </Text>
                        <Text
                            style={{
                                ...GlobalStyles.title,
                                fontSize: 90,
                                marginLeft: '15%',
                                lineHeight: 100
                            }}
                        >
                            {state ? state.week : 0}
                        </Text>
                        <SimpleLineIcons name="settings" size={30} onPress={handleWeek} />
                    </View>
                </View>
                <Divider />
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20, width: 125 }}>
                            Your Full Pullups:
                        </Text>
                        <Text
                            style={{
                                ...GlobalStyles.title,
                                fontSize: 90,
                                marginLeft: '15%',
                                lineHeight: 100
                            }}
                        >
                            {state ? state.maxPullups : 0}
                        </Text>
                        <SimpleLineIcons name="settings" size={30} onPress={handleMax} />
                    </View>
                </View>
                <Divider />
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20, width: 125 }}>
                            Total Pullup Counts:
                        </Text>
                        <Text
                            style={{
                                ...GlobalStyles.title,
                                fontSize: 90,
                                marginLeft: '15%',
                                lineHeight: 100
                            }}
                        >
                            {state ? state.totalPullups : 0}
                        </Text>
						<View style={{width: 30}}>
						</View>
                    </View>
                </View>
                <Divider />
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}
                >
                    <RegisterButton text="logout" onPress={handleLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profile_block: {
        // alignItems: 'space-between',
        justifyContent: 'center',
        marginHorizontal: '5%',
        paddingVertical: 10,
        height: 150
    },
    toRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weekNumber: {
        fontFamily: 'Jockey-One',
        color: '#333333',
        fontSize: 50
    }
});

export const ProfileScreen = React.memo(profileScreen);