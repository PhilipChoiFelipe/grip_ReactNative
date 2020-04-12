import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeTab } from './homeTab';
import { GlobalStyles } from '../style/globalStyle';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Card, Divider, ListItem } from 'react-native-elements';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeTab}
                options={{ headerTitle: props => <CustomHeader {...props} />, headerStyle: {height: 75, backgroundColor: '#FFFFF0'}}}
            />
        </Stack.Navigator>
    );
};

const CustomHeader = () => {
    return (
        <View style={GlobalStyles.title_Container}>
            <View style={{marginRight: '40%'}}>
                <Text style={GlobalStyles.home_state}>Current Program:</Text>
                <Text style={GlobalStyles.title}>Make one count</Text>
            </View>
            <Avatar
                rounded
                title="MS"
                size={50}
                titleStyle={{ fontSize: 20 }}
                overlayContainerStyle={{ backgroundColor: '#4D3636'}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
	
});









