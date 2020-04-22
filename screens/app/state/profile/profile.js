import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    RefreshControl,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../../style/globalStyle';
import { SimpleLineIcons } from '@expo/vector-icons';

//redux
import { logout } from '../../../../modules/auth';
import { check } from '../../../../modules/state';
import { useDispatch, useSelector } from 'react-redux';

const profileScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(
        () => {
			location.reload();
            // setRefreshing(true);
			// this.forceUpdate();
            // setRefreshing(false);
        },
        [refreshing]
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    let dispatch = useDispatch();
    let { user } = useSelector(state => ({
        user: state.state.user.user
    }));
    let state = user.state;
    // const { state } = user;
    if (state == null) {
        console.log('PROFILE STATE', state);
        navigation.navigate('CheckMax');
    }
    return (
        <SafeAreaView style={{ ...GlobalStyles.container, justifyContent: 'flex-start' }}>
            <ScrollView
                contentContainerStyle={{ ...GlobalStyles.container }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <View>
                            <Text style={GlobalStyles.home_state}>Current Program:</Text>
                            <Text style={GlobalStyles.title}>
                                {state ? state.program : 'Choose Program'}
                            </Text>
                        </View>
                        <SimpleLineIcons
                            name="settings"
                            size={30}
                            onPress={() => {
                                navigation.navigate('ChooseProgram');
                            }}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20 }}>
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
                        <SimpleLineIcons
                            name="settings"
                            size={30}
                            onPress={() => {
                                navigation.navigate('CheckMax');
                            }}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.profile_block}>
                    <View style={styles.toRow}>
                        <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20 }}>
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
                        <SimpleLineIcons name="settings" size={30} />
                    </View>
                </View>
                <Divider />
                <Button title="logout" onPress={handleLogout} />
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
    }
});

export const ProfileScreen = React.memo(profileScreen);