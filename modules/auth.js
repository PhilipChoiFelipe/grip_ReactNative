import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth';

import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [AUTOLOGIN, AUTOLOGIN_SUCCESS, AUTOLOGIN_FAILURE] = createRequestActionTypes('auth/AUTOLOGIN');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('auth/LOGOUT');


//normal redux actions
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
    form,
    key,
    value
}));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

//redux saga actions
export const autoLogin = createAction(AUTOLOGIN);
export const logIn = createAction(LOGIN, ({email, password}) => ({
	email, password
}));
export const signUp = createAction(SIGNUP, ({username, email, password}) => ({
	username, email, password
}));
export const logout = createAction(LOGOUT);

const autoSaga = createRequestSaga(AUTOLOGIN, authAPI.autoLogin);
const loginSaga = createRequestSaga(LOGIN, authAPI.logIn);
const signupSaga = createRequestSaga(SIGNUP, authAPI.signUp);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logOut);

export function* authSaga() {
	yield takeLatest(AUTOLOGIN, autoSaga);
	yield takeLatest(LOGIN, loginSaga);
	yield takeLatest(SIGNUP, signupSaga);
	yield takeLatest(LOGOUT, logoutSaga);
}


export const initialState = {
    signup: {
        username: '',
        email: '',
        password: ''
    },
    login: {
        email: '',
        password: ''
    },
	auth: {
		userToken: null,
		auth: false,
		authError: null,
		autoError: null,
		logoutError: null,
	}
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form]
        }),
		[LOGIN_SUCCESS]: (state, { payload: userToken }) => ({
			...state,
			auth: {
				...state.auth,
				userToken: userToken.jwtToken,
				auth: true,
				authError: null,
				autoError: null,
			}
		}),
		[LOGIN_FAILURE]: (state, { payload: error }) => ({
			...state,
			auth: {
				...state.auth,
				userToken: null,
				auth: false,
				authError: error
			}
		}),
		[SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
			...state,
			auth: {
				...state.auth,
				// auth: true,
				authError: null
			}
		}),
		[SIGNUP_FAILURE]: (state, { payload: error  }) => ({
			...state,
			auth: {
				...state.auth,	
				// auth: false,
				authError: error
			}
		}),
		[LOGOUT_SUCCESS]: (state, action) => ({
			...state,
			auth: {
				...state.auth,
				auth: false,
				userToken: null,
				logoutError: null
			}
		}),
		[AUTOLOGIN_SUCCESS]: (state, {payload: jwtToken}) => ({
			...state,
			auth: {
				...state.auth,
				autoError: null,
				userToken: jwtToken,
				auth: true
			}
		}),
		[AUTOLOGIN_FAILURE]: (state, {payload: error}) => ({
			...state,
			auth: {
				...state.auth,
				userToken: null,
				auth: false,
				autoError: error
			}
		})
    },
    initialState
);

export default auth;