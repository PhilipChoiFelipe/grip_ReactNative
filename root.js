import { registerRootComponent } from 'expo';
import App from './App';
import React from 'react';
//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const Root = () => {
    return(
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default registerRootComponent(Root);