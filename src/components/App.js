import React, {PropTypes} from 'react';
import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

// The params parameter is provided by the router
const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />

    </div>
);

export default App;