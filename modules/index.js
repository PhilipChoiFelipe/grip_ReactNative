import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import font, { fontsSaga } from './font';

import loading from './loading';

import auth, { authSaga } from './auth';
import state, { stateSaga } from './state';


const rootReducer = combineReducers({
	font,
	loading,
	auth,
	state
})

export function* rootSaga() {
	yield all([fontsSaga(), authSaga(), stateSaga()]);
}

export default rootReducer;