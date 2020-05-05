import React, { useState, useEffect } from 'react';
import AuthStack from './routes/auth/authStack';
// import SettingStack from './routes/settingStack';
import AppTab from './routes/state/appTab';
import { AppLoading } from 'expo';
import { AuthLoading } from './screens/register/authLoading';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthForm } from './screens/register/authForm';
import { SettingStack } from './routes/settingStack';
const Stack = createStackNavigator();

//redux
import { getFont } from './modules/font';
import { autoLogin } from './modules/auth';
import { check } from './modules/userState';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const App = () => {
    let dispatch = useDispatch();
    const { fontsLoaded, fontsError, user, checkError, userToken, auth, authLoading, autoError } = useSelector(state => ({
		//state
        user: state.userState.user.user,
		checkError: state.userState.user.checkError,
		
		//auth
        userToken: state.auth.auth.userToken,
        auth: state.auth.auth.auth,
		autoError: state.auth.auth.autoError,
		
		//font
        fontsLoaded: state.font.fontsLoaded,
        fontsError: state.font.fontsError,
		
		//loading
        authLoading: state.loading['auth/AUTOLOGIN']
    }), shallowEqual);

    //loads the font
    useEffect(
        () => {
            if (!fontsLoaded) {
                dispatch(getFont());
            }
        },
        [dispatch]
    );

    //check if user has token stored to auto login
    useEffect(
        () => {
            if (!auth) {
                dispatch(autoLogin());
            }
        },
        [dispatch, auth]
    );

    //if user is authenticated, get user's updated data
    useEffect(
        () => {
            if ((userToken && auth) && !autoError) {
				console.log('%c USER_TOKEN:', 'background: blue; color: white', userToken);
                dispatch(check({ userToken }));
            }
			// else{
			// 	console.log('%c AUTO_ERROR', 'background: red; color: white', autoError);
			// }
        },
        [dispatch, userToken, auth, autoError]
    );

    // useEffect(() => {
    //     if (authLoading) {
    //         console.log('AUTO LOADING', authLoading);
    //     }
    // });
	// if(!auth && authLoading){
	// 	return <AuthLoading/>;
	// }
	
    if (!fontsLoaded) {
        return <AppLoading />;
    }
	
    if (
        (user && user.state == null) ||
        ((user && user.state.program == null) || (user && user.state.maxPullups == null))
    ) {
        return <SettingStack />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="loading"
                    component={AuthLoading}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                {((auth == true) && (user != null)) && !checkError ? (
                    <Stack.Screen
                        name="App"
                        component={AppTab}
                        options={{ headerShown: false, gestureEnabled: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="AuthForm"
                        component={AuthForm}
                        options={{ headerShown: false, gestureEnabled: false }}
                    />
                    // <AuthStack Stack={Stack}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;