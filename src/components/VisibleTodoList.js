import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import {getVisibleTodos} from '../reducers';




// The params parameter is provided by the withRouter function call below
const mapStateToProps = (state, {params}) => (
    {
        todos: getVisibleTodos(
            state,
            params.filter || 'all'
        )
    }
);


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
const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
)(TodoList));


export default VisibleTodoList;