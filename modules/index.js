import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import font, { fontsSaga } from './font';

import loading from './loading';

import auth, { authSaga } from './auth';
import userState, { userStateSaga } from './userState';
import appState from './appState';
import reflection, {reflectionSaga} from './reflection';



const rootReducer = combineReducers({
	font,
	loading,
	auth,
	userState,
	reflection,
	appState
})

export function* rootSaga() {
	yield all([fontsSaga(), authSaga(), userStateSaga(), reflectionSaga()]);
}

export default rootReducer;