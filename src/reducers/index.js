import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// Note: Using ES6, object-literal shorthand notation
// Convention established is to name reducers & state key the same
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp;



