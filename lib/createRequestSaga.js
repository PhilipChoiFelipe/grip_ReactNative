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
		try{
			const response = yield call(request, action.payload);
			console.log('%c SAGA_INFO:', 'background: green; color: white', response.config);
			console.log('%c SAGA_DATA:', 'background: green; color: white', response.data);
			//response가 성공적으로 왔으면 SUCCESS_[requesttype]로 action dispatch
			if(!response.data){
				throw new Error(response);
			}
			yield put({
				type: SUCCESS,
				payload: response.data
			});
		}catch(e){
			let error = null;
			// console.log(e.response.data.message[0]);
			if(e.response && e.response.data){
				error = e.response.data.message;
			}else{
				error = e.message;
			}
			console.log('%c SAGA_ERROR', 'background: red; color: white', error);
			yield put({
				type: FAILURE,
				payload: error,
				error: true,
			});
		}
		//loading action으로 상태 업데이트(로딩 끝)
		yield put(finishLoading(type)); //loading 끝
	};
}
