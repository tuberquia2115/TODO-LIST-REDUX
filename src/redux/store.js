import { reduce } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer'
import middleware from './middleware'

const store = createStore(reducer, undefined, applyMiddleware(middleware))

export default store;