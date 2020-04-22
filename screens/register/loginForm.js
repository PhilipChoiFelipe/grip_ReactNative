import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
} from 'react-native';

//design
import { GlobalStyles } from '../../style/globalStyle';
import { RegisterButton, GoogleButton } from '../../shared/customButtons';
import { AntDesign } from '@expo/vector-icons';
import { CustomTextInput } from '../../shared/customTextInput';

//form
import * as yup from 'yup';
import { Formik } from 'formik';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, logIn } from '../../modules/auth';

export const LoginForm = ({ openModal }) => {
    const dispatch = useDispatch();
    //{email : '', passoword: ''}
    const { email, password, auth, authError } = useSelector(({ auth }) => ({
        email: auth.login.email,
        password: auth.login.password,
        auth: auth.auth,
        authError: auth.authError
    }));

    const onChange = useCallback((name, value) => {
        // console.log('NAME:', name);
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    }, [email, password]);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(logIn({ email, password }));
    };

	useEffect( () => {
		dispatch(initializeForm('login'));
	}, [dispatch]);
	
    useEffect(
        () => {
            if (authError) {
                console.log('AUTH ERROR:', authError);
                return;
            }
            if (auth) {
                console.log('LOGIN SUCCESS:', auth);
            }
        },
        [auth, authError]
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <Text style={styles.title}>GRIP</Text>
                <Text
                    style={{
                        ...GlobalStyles.home_state,
                        bottom: 25,
                        textAlign: 'center',
                        letterSpacing: 5
                    }}
                >
                    Pull yourself against gravity
                </Text>
                <View style={styles.form}>
                    <View>
                        <View style={styles.inputs}>
                            <View style={styles.inputBox}>
                                <CustomTextInput
                                    name="email"
                                    textContentType={'emailAddress'}
                                    placeholder="Email"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={onChange}
                                    value={email}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <CustomTextInput
                                    name="password"
                                    secureTextEntry={true}
                                    placeholder="Password"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={onChange}
                                    value={password}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.buttons}>
                            <View style={styles.registration}>
                                <GoogleButton>
                                    <AntDesign name="google" size={35} color="white" />
                                </GoogleButton>
                                <RegisterButton text="LogIn" onPress={onSubmit} />
                                <RegisterButton text="SignUp" onPress={openModal} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    title: {
        letterSpacing: 10,
        fontSize: 130,
        color: '#333333',
        textAlign: 'center',
        marginTop: '25%',
        fontFamily: 'Jockey-One',
        lineHeight: 160
    },
    form: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: 15
        // justifyContent: 'center'
    },
    inputBox: {
        backgroundColor: 'rgba(51, 51, 51, 0.7)',
        marginVertical: 12,
        marginHorizontal: '10%',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    input: {
        fontSize: 20,
        fontFamily: 'IBMPlexSans-light'
    },
    buttons: {
        marginTop: '5%'
    },
    registration: {
        marginTop: 10,
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});