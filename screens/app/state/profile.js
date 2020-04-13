import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { GlobalStyles } from '../../../style/globalStyle';
import { SimpleLineIcons } from '@expo/vector-icons';

export const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ ...GlobalStyles.container, justifyContent: 'flex-start' }}>
            <View style={styles.profile_block}>
                <View>
                    <Text style={GlobalStyles.home_state}>Current Program:</Text>
                    <Text style={GlobalStyles.title}>Make one count</Text>
                </View>
                <SimpleLineIcons name="settings" size={30} />
            </View>
            <Divider />
            <View style={styles.profile_block}>
                <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20 }}>
                    Your Full Pullups:
                </Text>
                <Text style={{ ...GlobalStyles.title, fontSize: 90, marginLeft: '15%' }}> 8 </Text>
                <SimpleLineIcons name="settings" size={30} />
            </View>
            <Divider />
            <View style={styles.profile_block}>
                <Text style={{ ...GlobalStyles.home_state, fontSize: 20, lineHeight: 20 }}>
                    Total Pullup Counts:
                </Text>
                <Text style={{ ...GlobalStyles.title, fontSize: 90, marginLeft: '15%' }}>120</Text>
                <SimpleLineIcons name="settings" size={30} />
            </View>
            <Divider />
        </View>
    );
};

const styles = StyleSheet.create({
    profile_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        paddingVertical: '15%'
    }
});