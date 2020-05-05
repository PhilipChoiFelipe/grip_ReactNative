import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as reflectionAPI from '../lib/api/reflection';

//types
const [REFLECTIONS, REFLECTIONS_SUCCESS, REFLECTIONS_FAILURE] = createRequestActionTypes(
    'reflection/REFLECTIONS'
);

const [
    WRITE_REFLECTIONS,
    WRITE_REFLECTIONS_SUCCESS,
    WRITE_REFLECTIONS_FAILURE
] = createRequestActionTypes('reflection/WRITE_REFLECTIONS');

const [DELETE_REFLECTION, DELETE_REFLECTION_SUCCESS, DELETE_REFLECTION_FAILURE] = createRequestActionTypes('reflection/DELETE_REFLECTION');

const [EDIT_REFLECTION, EDIT_REFLECTION_SUCCESS, EDIT_REFLECTION_FAILURE] = createRequestActionTypes('reflection/EDIT_REFLECTION');

//actions
export const getReflections = createAction(REFLECTIONS);
export const writeReflection = createAction(
    WRITE_REFLECTIONS,
    ({ memo, difficulty, nextWeek, programName, finishedSet, week, day }) => ({
        memo,
        difficulty,
        nextWeek,
        programName,
        finishedSet,
        week,
        day
    })
);

export const deleteReflection = createAction(DELETE_REFLECTION, ({date}) => ({date}));

export const editReflection = createAction(EDIT_REFLECTION, ({memo, difficulty, date}) => ({memo, difficulty, date}));

//saga
const getReflectionsSaga = createRequestSaga(REFLECTIONS, reflectionAPI.getReflections);
const writeReflectionSaga = createRequestSaga(WRITE_REFLECTIONS, reflectionAPI.writeReflection);
const deleteReflectionSaga = createRequestSaga(DELETE_REFLECTION, reflectionAPI.deleteReflection);
const editReflectionSaga = createRequestSaga(EDIT_REFLECTION, reflectionAPI.editReflection);


//saga lists
export function* reflectionSaga() {
    yield takeLatest(REFLECTIONS, getReflectionsSaga);
    yield takeLatest(WRITE_REFLECTIONS, writeReflectionSaga);
	yield takeLatest(DELETE_REFLECTION, deleteReflectionSaga);
	yield takeLatest(EDIT_REFLECTION, editReflectionSaga);
}

//state
const initialState = {
    reflections: null,
    error: {
        getReflectionsError: null,
        writeReflectionError: null,
		deleteReflectionError: null,
		editReflectionError: null
    }
};

//reducer
const reflection = handleActions(
    {
        [REFLECTIONS_SUCCESS]: (state, { payload: reflections }) => ({
            reflections: reflections,
            error: {
                ...state.error,
                getReflectionsError: null
            }
        }),
        [REFLECTIONS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error: {
                ...state.error,
                getReflectionsError: error
            }
        }),
		[EDIT_REFLECTION_SUCCESS]: (state, { payload: reflections }) => ({
            reflections: reflections,
            error: {
                ...state.error,
                editReflectionError: null
            }
        }),
		[EDIT_REFLECTION_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error: {
                ...state.error,
                editReflectionError: error
            }
        }),
		[DELETE_REFLECTION_SUCCESS]: (state, { payload: reflections }) => ({
            reflections: reflections,
            error: {
                ...state.error,
                deleteReflectionError: null
            }
        }),
		[DELETE_REFLECTION_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error: {
                ...state.error,
                deleteReflectionError: error
            }
        }),
        [WRITE_REFLECTIONS_SUCCESS]: (state, { payload: reflections }) => ({
            reflections: reflections.reflections,
            error: {
                ...state.error,
                writeReflectionError: null
            }
        }),
        [WRITE_REFLECTIONS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error: {
                ...state.error,
                writeReflectionError: error
            }
        })
    },
    initialState
);

export default reflection;