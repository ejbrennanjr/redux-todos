import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todoApp from './reducers';
import App from './components/App';
//extra
import expect from 'expect'; 
import deepFreeze from 'deep-freeze';


// const persistedState = {
//     todos: [{
//         id: '0',
//         text: 'Welcome back!',
//         completed: false
//     }]
// };


ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <App />
    </Provider>,
    document.getElementById('root')

);







// // -------------------------------------------------------
// // Tests
// // -------------------------------------------------------

// const testAddTodo = () => {
//     const stateBefore = [];

//     const action = {
//         type: 'ADD_TODO', 
//         id: 0,
//         text: 'Learn Redux'
//     };

//     const stateAfter = [{
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     }];

//     deepFreeze(stateBefore);
//     deepFreeze(action);    

//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// };


// const testToggleTodo = () => {
//     const stateBefore = [{
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     },
//     {
//         id: 1,
//         text: 'Go shopping',
//         completed: false
//     }];

//     const action = {
//         type: 'TOGGLE_TODO', 
//         id: 1
//     };

//     const stateAfter = [{
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     },
//     {
//         id: 1,
//         text: 'Go shopping',
//         completed: true
//     }];

//     deepFreeze(stateBefore);
//     deepFreeze(action);    

//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// };


// testAddTodo();
// testToggleTodo();
// console.log('All tests passed');
// // -------------------------------------------------------




// // -------------------------------------------------------
// // Sample Execution of Dispatches
// // -------------------------------------------------------
// // const store = createStore(todoApp);
// // console.log('Initial State:');
// // console.log(store.getState());
// // console.log('------------------');

// // console.log('Dispatching ADD_TODO');
// // store.dispatch({
// //     type: 'ADD_TODO',
// //     id: 0,
// //     text: 'Learn Redux'
// // });

// // console.log('Current State:');
// // console.log(store.getState());
// // console.log('------------------');

// // console.log('Dispatching ADD_TODO');
// // store.dispatch({
// //     type: 'ADD_TODO',
// //     id: 1,
// //     text: 'Go Shopping'
// // });

// // console.log('Current State:');
// // console.log(store.getState());
// // console.log('------------------');

// // console.log('Dispatching TOGGLE_TODO');
// // store.dispatch({
// //     type: 'TOGGLE_TODO',
// //     id: 0
// // });

// // console.log('Current State:');
// // console.log(store.getState());
// // console.log('------------------');

// // console.log('Dispatching SET_VISIBILITY_FILTER');
// // store.dispatch({
// //     type: 'SET_VISIBILITY_FILTER',
// //     filter: 'SHOW_COMPLETED'
// // });

// // console.log('Current State:');
// // console.log(store.getState());
// // console.log('------------------');

// // // -------------------------------------------------------