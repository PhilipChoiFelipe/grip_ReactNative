import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getFonts } from '../lib/loadFont';
//Type
const FONT = 'font/FONT';
const FONT_SUCCESS = 'font/FONT_SUCCESS';
const FONT_FAILURE = 'font/FONT_FAILURE';

//Action
export const getFont = createAction(FONT);

//Saga
const fontSaga = function*() {
	console.log('font saga works')
    try {
        //api request 시작
        const response = yield call(getFonts)
		yield put({
			type: FONT_SUCCESS,
			fontsError: null
		})
    } catch (e) {
		yield put({
			type: FONT_FAILURE,
			fontsError: e
		})
	}
};

export function* fontsSaga() {
	yield takeLatest(FONT, fontSaga);
}

const initialState = {
	fontsLoaded: false,
    fontsError: null
};

const font = handleActions(
    {
        [FONT_SUCCESS]: (state, action) => ({
			fontsLoaded: true,
            fontsError: null
        }),
        [FONT_FAILURE]: (state, { payload: error }) => ({
			fontsLoaded: false,
            erfontsErrorror: error
        })
    },
    initialState
);

export default font;











