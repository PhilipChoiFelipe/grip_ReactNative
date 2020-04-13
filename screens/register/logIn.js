import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { RegisterButton } from '../../shared/customButtons';
import * as yup from 'yup';
const LoginSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup
        .string()
        .required()
        .min(5)
        .max(20)
});

const LoginForm = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>GRIP</Text>
            <View style={styles.form}>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema}>
                    {props => (
                        <View style={styles.inputs}>
                            <TextInput
                                placeholder="Email"
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur('email')}
                                style={styles.input}
                            />
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Password"
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                                style={styles.input}
                            />
                            <View style={styles.buttons}>
                                <RegisterButton text="      SignIn with Google       " />
                                <View style={styles.registration}>
                                    <RegisterButton text="   LogIn   " />
                                    <RegisterButton text="  SignUp  " onPress={() => navigation.navigate('CheckMax')} />
                                </View>
                            </View>
                            <Text style={styles.errorText}>{(props.touched.email && props.errors.email) || ' '}</Text>
                            <Text style={styles.errorText}>{(props.touched.password && props.errors.password) || ' '}</Text>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFF0',
        height: '100%'
    },
    title: {
		letterSpacing: 10,
        fontSize: 130,
        color: '#333333',
        textAlign: 'center',
        marginTop: '20%',
		fontFamily: 'Jockey-One'
    },
    form: {
        flex: 1,
        marginTop: '10%',
        marginHorizontal: 15
        // justifyContent: 'center'
    },
    input: {
        marginVertical: 12,
        marginHorizontal: '10%',
        paddingVertical: 13,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(51, 51, 51, 0.7)',
        fontSize: 20,
        borderRadius: 8,
        placeholderTextColor: '#FFFFFF',
        color: 'black',
		fontFamily: 'IBMPlexSans-light'
    },
    buttons: {
        marginTop: 12
    },
    registration: {
        marginTop: 24,
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    }
});

export default LoginForm;