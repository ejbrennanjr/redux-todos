import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions'; // assumes index.js?


// Here dispatch is destructerd from the props (see connect function below)
// Notice that the AddTodo is a let which allows it be reassigned by the curried
// connect call below. 
const AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                if(!input.value.trim()) {
                    return;
                }
                dispatch(addTodo(input.value));
                input.value = "";
            }}>
                <input ref={node => {input = node; }} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>    
    );
};

AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired
};

// Connect is passed with null in both mapStateToProps and mapDispatchTo Props
// As a result, component does not subscribe to the store and gets the dispatch 
// function automatically mapped to the props.
// Notice this is a curried function and the AddTodo variable is reassigned after connect.
export default connect()(AddTodo);
