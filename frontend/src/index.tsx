import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';


// Redux
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./store/reducers/root";
import thunk from 'redux-thunk';

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
		: null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
