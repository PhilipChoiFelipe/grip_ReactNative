import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const SET_INCREASE = 'appState/SET_INCREASE';
const SET_RESET = 'appState/SET_RESET';
const SET_SET = 'appState/SET_SET';
const TAB = 'appState/TAB';
const DRAWER = 'appState/DRAWER';
const DRAWER_CLOSE = 'appState/DRAWER_CLOSE';

export const setIncrease = createAction(SET_INCREASE);
export const setReset = createAction(SET_RESET);
export const setSet = createAction(SET_SET, number => number);
export const tabToggle = createAction(TAB);
export const drawerToggle = createAction(DRAWER);
export const drawerClose = createAction(DRAWER_CLOSE);


const initialState = {
	currentSet: 0,
    toggle: {
        showTab: true,
        showDrawer: false
    }
}

const appState = handleActions(
	{
        [SET_INCREASE]: (state, action) => ({
            ...state,
            currentSet: state.currentSet + 1
        }),
        [SET_RESET]: (state, action) => ({
            ...state,
            currentSet: 0
        }),
        [SET_SET]: (state, { payload: number }) => ({
            ...state,
            currentSet: number
        }),
        [TAB]: (state, action) => ({
            ...state,
            toggle: {
                ...state.toggle,
                showTab: !state.toggle.showTab
            }
        }),
        [DRAWER]: (state, action) => ({
            ...state,
            toggle: {
                ...state.toggle,
                showDrawer: !state.toggle.showDrawer
            }
        }),
        [DRAWER_CLOSE]: (state, action) => ({
            ...state,
            toggle: {
                ...state.toggle,
                showDrawer: false
            }
        }),
	}, initialState
)

export default appState;