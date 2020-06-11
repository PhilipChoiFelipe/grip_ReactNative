import React, { useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

//design
import { RegisterButton } from '../../shared/customButtons';
import { GlobalStyles } from '../../style/globalStyle';
import { CustomTextInput } from '../../shared/customTextInput';

//component
import { CreateAlert } from '../../shared/alert';

//form
import { Formik } from 'formik';
import * as yup from 'yup';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signUp } from '../../modules/auth';


export const SignupForm = ({ closeModal }) => {
    const dispatch = useDispatch();
    //{username: '', email : '', passoword: ''}
    const { username, email, password, auth, authError } = useSelector(({ auth }) => ({
        username: auth.signup.username,
        email: auth.signup.email,
        password: auth.signup.password,
        auth: auth.auth,
        authError: auth.authError
    }));

    const onChange = (name, value) => {
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
		CreateAlert("Verify mail sent to", email);
        console.log(username, email, password);
        dispatch(signUp({ username, email, password }));
    };

	useEffect( () => {
		dispatch(initializeForm('signup'));
	}, [dispatch]);
	
    useEffect(
        () => {
            if (authError) {
                console.log('AUTH ERROR:', authError);
                return;
            }
            if (auth) {
                console.log('SIGNUP SUCCESS:', auth);
            }
        },
        [auth, authError]
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.container}>
                <View
                    style={{
                        ...GlobalStyles.title_Container,
                        height: 200,
                        marginTop: '5%',
                        alignSelf: 'center'
                    }}
                >
                    <Text style={{ ...GlobalStyles.title, fontSize: 60, lineHeight: 70 }}>
                        Signup
                    </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <View style={styles.inputBox}>
                            <CustomTextInput
                                name="username"
                                placeholder="Username"
                                placeholderTextColor="#FFFFFF"
                                onChangeText={onChange}
                                value={username}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <CustomTextInput
                                name="email"
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
                </View>
                <View style={styles.buttons}>
                    <RegisterButton text="Cancel" onPress={closeModal} />
                    <RegisterButton text="SignUp" onPress={onSubmit} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    form: {
        // marginTop: '10%',
        marginHorizontal: 15,
        // justifyContent: 'flex-start'
        justifyContent: 'center'
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
		flex:1,
		marginTop:'15%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});