//api 로딩상태를 관리해준다. 

import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
	START_LOADING,
	requestType => requestType,
)

export const finishLoading = createAction(
	FINISH_LOADING,
	requestType => requestType,
)

const initialState = {};

//loading reducer 
const loading = handleActions(
	{
		//Request Type의 로딩상태 관리!
		[START_LOADING]: (state, action) => ({
			...state,
			[action.payload]: true,
		}),
		[FINISH_LOADING]: (state, action) => ({
			...state,
			[action.payload]: false,
		}),
	},
	initialState,
)

export default loading;