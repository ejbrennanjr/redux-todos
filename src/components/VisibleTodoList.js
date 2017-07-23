// NOTE: This was previously a generated container component
// When we introduced the async API call, we changed this 
// to require REACT and extends the Component class.
// We did this so that we could use the lifecyle react hooks
import React, {Component, PropTypes} from 'react'; 

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import TodoList from './TodoList';
import {getVisibleTodos} from '../reducers';



class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter).then(todos =>
            fetchTodos(filter)
        );
    }


    render() {
        const { toggleTodo, ...rest } = this.props;
        return <TodoList {...rest} onTodoClick={toggleTodo} />;

    }
}



// The params parameter is provided by the withRouter function call below
const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};



// Commenting out mapDispatchToProps
// Instead, using an understood convention of connect below where parameters passed to
// the callback prop match the order of the parameters passed to action creator
// This is a common case    
// const mapDispatchToProps = (dispatch) => (
//     {
//         onTodoClick(id) {
//             dispatch(toggleTodo(id));
//         }
//     }
// );
VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));


VisibleTodoList.propTypes = {
    filter: PropTypes.string.isRequired,
    receiveTodos: PropTypes.func.isRequired
};

export default VisibleTodoList;