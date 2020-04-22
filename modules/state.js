import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as stateAPI from '../lib/api/state';

import produce from 'immer';

const INCREASE = 'state/INCREASE';
const DECREASE = 'state/DECREASE';

const TAB = 'state/TAB';

//async
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('state/CHECK');
const [UPDATEMAX, UPDATEMAX_SUCCESS, UPDATEMAX_FAILURE] = createRequestActionTypes(
    'state/UPDATEMAX'
);
const [CHOOSEPRO, CHOOSEPRO_SUCCESS, CHOOSEPRO_FAILURE] = createRequestActionTypes(
    'state/CHOOSEPRO'
);
const [PROGRAM, PROGRAM_SUCCESS, PROGRAM_FAILURE] = createRequestActionTypes('state/PROGRAM');

export const check = createAction(CHECK, userToken => userToken);
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const tabToggle = createAction(TAB);

//async
export const updateMax = createAction(UPDATEMAX, ({ maxPullups }) => ({
    maxPullups
}));

export const chooseProgram = createAction(CHOOSEPRO, ({ programName, stay }) => ({
    programName,
    stay
}));

export const getProgram = createAction(PROGRAM);

const checkSaga = createRequestSaga(CHECK, stateAPI.check);
const updateMaxSaga = createRequestSaga(UPDATEMAX, stateAPI.updateMax);
const chooseProSaga = createRequestSaga(CHOOSEPRO, stateAPI.chooseProgram);
const getProgramSaga = createRequestSaga(PROGRAM, stateAPI.getProgram);

export function* stateSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(UPDATEMAX, updateMaxSaga);
    yield takeLatest(CHOOSEPRO, chooseProSaga);
    yield takeLatest(PROGRAM, getProgramSaga);
}

const initialState = {
    updateMax: {
        maxPullups: 0,
        updateMaxError: null,
        programs: null,
        stay: false
    },
    chooseProgram: {
        chooseError: null
    },
    user: {
        user: null,
        checkError: null
    },
    program: {
        program: null,
        programError: null
    },
    showTab: true
};

const state = handleActions(
    {
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
        [TAB]: (state, action) => ({
            ...state,
            showTab: !state.showTab
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
        [UPDATEMAX_SUCCESS]: (state, { payload: response }) => ({
            ...state,
            updateMax: {
                maxPullups: state.updateMax.maxPullups,
                updateMaxError: null,
                programs: response.programs,
                stay: response.stay
            }
        }),
        [UPDATEMAX_FAILURE]: (state, { payload: error }) => ({
            ...state,
            updateMax: {
                ...updateMax,
                updateMaxError: error
            }
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

export default state;