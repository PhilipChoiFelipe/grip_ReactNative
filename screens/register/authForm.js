import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { GlobalStyles } from '../../style/globalStyle';
import { MaterialIcons } from '@expo/vector-icons';

export const AuthForm = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <View style={GlobalStyles.container}>
			{/*
            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalContent}>
                    <SignupForm closeModal={closeModal} />
                </View>
            </Modal>
			*/}
            <LoginForm openModal={openModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        alignSelf: 'center'
        // marginTop: 20
    },
    modalContent: {
        flex: 1
    }
});
