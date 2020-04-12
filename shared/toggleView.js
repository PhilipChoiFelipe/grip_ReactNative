import React from 'react';
import { View } from 'react-native';

export const ToggleView = ({ children, hide, style }) => {
    if (hide) {
        return null;
    }
    return <View style={style}>{children}</View>;
};