import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as stateAPI from '../lib/api/state';


//type
//normal
//control maxpullups
const INCREASE = 'userState/INCREASE';
const DECREASE = 'userState/DECREASE';

//initialize MAX 
const RESET_MAX = 'userState/RESET_MAX';

//async
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('userState/CHECK');
const [UPDATEMAX, UPDATEMAX_SUCCESS, UPDATEMAX_FAILURE] = createRequestActionTypes(
    'userState/UPDATEMAX'
);
const [CHOOSEPRO, CHOOSEPRO_SUCCESS, CHOOSEPRO_FAILURE] = createRequestActionTypes(
    'userState/CHOOSEPRO'
);
const [PROGRAM, PROGRAM_SUCCESS, PROGRAM_FAILURE] = createRequestActionTypes('userState/PROGRAM');
const [SUMMARY, SUMMARY_SUCCESS, SUMMARY_FAILURE] = createRequestActionTypes('userState/SUMMARY');
const [WEEKS, WEEKS_SUCCESS, WEEKS_FAILURE] = createRequestActionTypes('userState/WEEKS');
const [SELECT_WEEK, SELECT_WEEK_SUCCESS, SELECT_WEEK_FAILURE] = createRequestActionTypes(
    'userState/SELECTED_WEEK'
);
const [NEXT_WEEK, NEXT_WEEK_SUCCESS, NEXT_WEEK_FAILURE] = createRequestActionTypes('userState/NEXT_WEEK');

//Action
//normal
export const check = createAction(CHECK, userToken => userToken);
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);


export const resetMax = createAction(RESET_MAX);

//async
export const updateMax = createAction(UPDATEMAX, ({ maxPullups }) => ({
    maxPullups
}));

export const chooseProgram = createAction(CHOOSEPRO, ({ programName, stay }) => ({
    programName,
    stay
}));

export const getProgram = createAction(PROGRAM);

export const getWeeks = createAction(WEEKS);

export const selectWeek = createAction(SELECT_WEEK, ({ selectedWeek }) => ({ selectedWeek }));

export const nextWeek = createAction(NEXT_WEEK, ({ nextWeek, pullupCount }) => ({ nextWeek, pullupCount }));

//saga
const checkSaga = createRequestSaga(CHECK, stateAPI.check);
const updateMaxSaga = createRequestSaga(UPDATEMAX, stateAPI.updateMax);
const chooseProSaga = createRequestSaga(CHOOSEPRO, stateAPI.chooseProgram);
const getProgramSaga = createRequestSaga(PROGRAM, stateAPI.getProgram);
const getWeeksSaga = createRequestSaga(WEEKS, stateAPI.getWeeks);
const selectWeekSaga = createRequestSaga(SELECT_WEEK, stateAPI.selectWeek);
const nextWeekSaga = createRequestSaga(NEXT_WEEK, stateAPI.nextWeek);

export function* userStateSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(UPDATEMAX, updateMaxSaga);
    yield takeLatest(CHOOSEPRO, chooseProSaga);
    yield takeLatest(PROGRAM, getProgramSaga);
    yield takeLatest(WEEKS, getWeeksSaga);
    yield takeLatest(SELECT_WEEK, selectWeekSaga);
	yield takeLatest(NEXT_WEEK, nextWeekSaga);
}

const initialState = {
    updateMax: {
        maxPullups: 0,
        updateMaxError: null,
        programs: null,
        stay: null
    },
    chooseProgram: {
        chooseError: null
    },
    programWeeks: {
        programWeeks: null,
        programWeeksError: null,
        selectWeekError: null
    },
    user: {
        user: null,
        checkError: null,
		nextWeekError: null
    },
    program: {
        program: null,
        programError: null
    },
};

const userState = handleActions(
    {
		[NEXT_WEEK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user: {
                ...state.user,
                user: user,
				nextWeekError: null
            }
        }),
		[NEXT_WEEK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user: {
                ...state.user,
				nextWeekError: error
            }
        }),
        [SELECT_WEEK_SUCCESS]: (state, action) => ({
            ...state,
            program: {
                ...state.program,
                program: action.payload.program
            },
            user: {
                ...state.user,
                user: action.payload.user
            }
        }),
        [SELECT_WEEK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            programWeeks: {
                ...state.programWeeks,
                selectWeekError: error
            }
        }),
        [WEEKS_SUCCESS]: (state, { payload: programWeeks }) => ({
            ...state,
            programWeeks: {
                programWeeks: programWeeks,
                programWeeksError: null
            }
        }),
        [WEEKS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            programWeeks: {
                programWeeks: null,
                programWeeksError: error
            }
        }),
        [PROGRAM_SUCCESS]: (state, { payload: program }) => ({
            ...state,
            program: {
                program: program,
                programError: null
            }
        }),
        [PROGRAM_FAILURE]: (state, { payload: error }) => ({
            ...state,
            program: {
                program: null,
                programError: error
            }
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user: {
                user: user,
                checkError: null
            }
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: {
                user: null,
                checkError: error
            }
        }),
        [INCREASE]: (state, action) => ({
            ...state,
            updateMax: {
                ...updateMax,
                maxPullups: state.updateMax.maxPullups + 1
            }
        }),
        [DECREASE]: (state, action) => ({
            ...state,
            updateMax: {
                ...updateMax,
                maxPullups: state.updateMax.maxPullups - 1
            }
        }),
		[RESET_MAX]: (state, action) => ({
			...state,
			updateMax: {
				maxPullups: state.updateMax.maxPullups,
				updateMaxError: null,
				programs: null,
				stay: null
			}
		}),
        [UPDATEMAX_SUCCESS]: (state, { payload: response }) => ({
            ...state,
            updateMax: {
                maxPullups: state.updateMax.maxPullups,
                updateMaxError: null,
                programs: response.programs,
                stay: response.stay
            },
            user: {
                ...state.user,
                user: response.user
            }
        }),
        [UPDATEMAX_FAILURE]: (state, { payload: error }) => ({
            ...state,
            updateMax: {
                ...updateMax,
                updateMaxError: error,
				stay: null,
            },
        }),
        [CHOOSEPRO_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            chooseProgram: {
                chooseError: null
            },
            user: {
                user: user
            }
        }),
        [CHOOSEPRO_FAILURE]: (state, { payload: error }) => ({
            ...state,
            chooseProgram: {
                chooseError: error
            },
            user: {
                user: null
            }
        })
    },
    initialState
);

export default userState;