import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth';

import produce from 'immer';

const MODAL = 'auth/MODAL';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [AUTOLOGIN, AUTOLOGIN_SUCCESS, AUTOLOGIN_FAILURE] = createRequestActionTypes('auth/AUTOLOGIN');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('auth/LOGOUT');


//normal redux actions
export const toggleModal = createAction(MODAL);
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
	modal: false,
	userToken: null,
	auth: false,
	authError: null,
	checkError: null,
	logoutError: null,
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
		[MODAL]: (state, action) => ({
			...state,
			modal: !state.modal
		}),
		[LOGIN_SUCCESS]: (state, { payload: userToken }) => ({
			...state,
			userToken: userToken,
			auth: true,
			authError: null
		}),
		[LOGIN_FAILURE]: (state, { payload: error }) => ({
			...state,
			userToken: null,
			auth: false,
			authError: error
		}),
		[SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
			...state,
			auth: auth,
			authError: null
		}),
		[SIGNUP_FAILURE]: (state, { payload: error  }) => ({
			...state,
			auth: null,
			authError: error
		}),
		[LOGOUT_SUCCESS]: (state, action) => ({
			...state,
			auth: false,
			userToken: null,
			logoutError: null
		}),
		[LOGIN_FAILURE]: (state, {payload: error}) => ({
			...state,
			logoutError: error
		}),
		[AUTOLOGIN_SUCCESS]: (state, action) => ({
			...state,
			userToken: action.payload,
			auth: true
		}),
		[AUTOLOGIN_FAILURE]: (state, action) => ({
			...state,
			userToken: null,
			auth: false
		})
    },
    initialState
);

export default auth;