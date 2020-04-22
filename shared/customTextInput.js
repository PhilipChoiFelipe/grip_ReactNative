import React from 'react';
import { TextInput } from 'react-native';

export const CustomTextInput = ({ value, onChangeText, name, ...props }) => {
    // console.log('VALUE:', value);
    return (
        <TextInput
            value={value}
            onChangeText={value => onChangeText(name, value)} //... Bind the name here
            {...props}
        />
    );
};