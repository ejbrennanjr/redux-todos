import 'babel-polyfill';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import expect from 'expect'; 
import deepFreeze from 'deep-freeze';


// -------------------------------------------------------
// Reducers
// -------------------------------------------------------

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO': 
        return {
            id: action.id,
            text: action.text,
            completed: false
        };
    case 'TOGGLE_TODO': 
        if(state.id !==  action.id) {
            return state;
        }

        // return {
        //     ...state,
        //      completed: !state.completed
        // };

        return Object.assign({}, state, {
            completed: !state.completed
        }); 
    default: 
        return state;
  }  
};

const todos = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO': 
        return [
            ...state,
            todo(undefined, action)
        ];
    case 'TOGGLE_TODO': 
        return state.map(t => todo(t, action));
    default: 
        return state;
  }  
};

const visibilityFilter = (state='SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER': 
        return action.filter;
    default: 
        return state;
  }  
};




// Note: Using ES6, object-literal shorthad notation
// Convention established is to name reducers & state key the same
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

// --------------------------------------------------------------
// This code replaced by combineReducers above.
// --------------------------------------------------------------
// const todoApp = (state={}, action) => {
// console.log("i'm being called.")
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// };



let nextTodoId = 0;

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'SHOW_ALL': 
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE': 
            return todos.filter(
                t => !t.completed
            );        
    }
};




// -------------------------------------------------------
// Action Creators
// -------------------------------------------------------
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
};

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

// -------------------------------------------------------
// Components
// -------------------------------------------------------

// Here dispatch is destructerd from the props (see connect function below)
// Notice that the AddTodo is a let which allows it be reassigned by the curried
// connect call below. 
let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};

// Connect is passed with null in both mapStateToProps and mapDispatchTo Props
// As a result, component does not subscribe to the store and gets the dispatch 
// function automatically mapped to the props.
// Notice this is a curried function and the AddTodo variable is reassigned after connect.
AddTodo = connect()(AddTodo);

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: 
                completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>    
);


const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo => 
            <Todo 
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);





const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    };
};
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);





const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        {' '}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        {' '}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
);


const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>;
    }
    
    return (
        <a href="#"
           onClick={e => {
                e.preventDefault();
                onClick();
           }}>
            {children}
        </a>
    );
};






const mapStateToLinkProps = (
    state,
    ownProps
) => {
    return {
        active: ownProps.filter === 
                    state.visibilityFilter
    };
};
const mapDispatchToLinkProps = (
    dispatch,
    ownProps
) => {
    return {
        onClick: () => {
            dispatch(
                setVisibilityFilter(ownProps.filter)
            );
        }
    };
};
const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);





const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />

    </div>
);







// -------------------------------------------------------
// REACT-REDUX Configuration
// -------------------------------------------------------

// class Provider extends Component {
//     getChildContext() {
//         return {
//             store: this.props.store
//         };
//     }

//     render() {
//         return this.props.children;
//     }
// }
// Provider.childContextTypes = {
//     store: React.PropTypes.object
// }

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')

);



// -------------------------------------------------------
// Tests
// -------------------------------------------------------

const testAddTodo = () => {
    const stateBefore = [];

    const action = {
        type: 'ADD_TODO', 
        id: 0,
        text: 'Learn Redux'
    };

    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);    

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};


const testToggleTodo = () => {
    const stateBefore = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: false
    }];

    const action = {
        type: 'TOGGLE_TODO', 
        id: 1
    };

    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
        id: 1,
        text: 'Go shopping',
        completed: true
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);    

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};


testAddTodo();
testToggleTodo();
console.log('All tests passed');
// -------------------------------------------------------




// -------------------------------------------------------
// Sample Execution of Dispatches
// -------------------------------------------------------
// const store = createStore(todoApp);
// console.log('Initial State:');
// console.log(store.getState());
// console.log('------------------');

// console.log('Dispatching ADD_TODO');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
// });

// console.log('Current State:');
// console.log(store.getState());
// console.log('------------------');

// console.log('Dispatching ADD_TODO');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 1,
//     text: 'Go Shopping'
// });

// console.log('Current State:');
// console.log(store.getState());
// console.log('------------------');

// console.log('Dispatching TOGGLE_TODO');
// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 0
// });

// console.log('Current State:');
// console.log(store.getState());
// console.log('------------------');

// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED'
// });

// console.log('Current State:');
// console.log(store.getState());
// console.log('------------------');

// // -------------------------------------------------------