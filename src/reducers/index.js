import {combineReducers} from 'redux';
import todos from './todos';

// Note: Using ES6, object-literal shorthand notation
// Convention established is to name reducers & state key the same
const todoApp = combineReducers({
    todos
});

export default todoApp;



