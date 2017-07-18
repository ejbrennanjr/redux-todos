import {combineReducers} from 'redux';
import todos, * as fromTodos from './todos';  // All exports put on fromTodos object, avoid name collision with getVisibleTodos defined below

// Note: Using ES6, object-literal shorthand notation
// Convention established is to name reducers & state key the same
const todoApp = combineReducers({
    todos
});

export default todoApp;

// The state parameter is to be considered related to the state resulting from the combineReducers
// Passing only the namespace of the the state relevant for selector
export const getVisibleTodos = (state, filter) => {
    return fromTodos.getVisibleTodos(state.todos, filter);
};



