import React from 'react';
import { Avatar } from 'react-native-elements';
import { Text, View } from 'react-native';
import { GlobalStyles } from './globalStyle';

export const HeaderStyle = {
    headerStyle: { height: 75, backgroundColor: '#B3B3B3' },
    headerRight: () => (
        <Avatar
            rounded
            title="MS"
            size={50}
            titleStyle={{ fontSize: 20 }}
            overlayContainerStyle={{ backgroundColor: '#4D3636' }}
        />
    ),
    headerRightContainerStyle: { marginRight: '5%' }
};

export const CustomHeader = ({title}) => {
    return (
            <View>
                <Text style={GlobalStyles.title}>{title}</Text>
            </View>
    );
};
