import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;
	return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;
	
	//gets the action from original action dispatch
	return function*(action) {
		//loading action을 dispatch한뒤, reducer로 state 업데이트. 
		yield put(startLoading(type)); //로딩시작
		// console.log('API CALL PAYLOAD:', action.payload);
		try{
			//api request 시작
			const response = yield call(request, action.payload);
			console.log('API CALL RESPONSE:', response)
			//response가 성공적으로 왔으면 SUCCESS_[requesttype]로 action dispatch
			if(response.data == null){
				throw new Error(response);
			}
			yield put({
				type: SUCCESS,
				payload: response.data
			});
		}catch(e){
			yield put({
				type: FAILURE,
				payload: e,
				error: true,
			});
		}
		//loading action으로 상태 업데이트(로딩 끝)
		yield put(finishLoading(type)); //loading 끝
	};
}
