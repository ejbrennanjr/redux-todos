import {combineReducers} from 'redux';
import todo from './todo';


const byId = (state={}, action) => {
  switch(action.type) {
    case 'ADD_TODO': // pass thru -- when ADD_TODO, logic below will pass undefined to todo
    case 'TOGGLE_TODO': 
        // The tutorial uses spread operator on the object.  I added the necessary libraries
        // but babel throws an error in compile.
        return Object.assign({}, 
                            state, 
                            { [action.id]: todo(state[action.id], action) });
                        

    default: 
        return state;
  }  
};


const allIds = (state=[], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});


export default todos;





// This is a "selector" funcion
// Will be leveraged by the UI (thru same name function provided in reducers/index)
// "get" prefix is the naming convention we are using for selectors
// Those used outside this module will be exported

const getAllTodos = (state) => 
    state.allIds.map(id => state.byId[id]);



export const getVisibleTodos = (state, filter) => {
    const allTodos = getAllTodos(state);
    switch(filter) {
        case 'all': 
            return allTodos;
        case 'completed':
            return allTodos.filter(t => t.completed);
        case 'active': 
            return allTodos.filter(t => !t.completed);        
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};