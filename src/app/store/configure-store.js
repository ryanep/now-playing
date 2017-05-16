import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

export default function configureStore() {
	const store = createStore(reducers);
    return store;
}