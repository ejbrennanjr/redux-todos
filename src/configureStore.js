import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import todoApp from './reducers';


const configureStore = () => {

    // Note: we could just call ...
    //      applyMiddleware(promise, createLogger);
    // But we are optionally handling logger based on whether in prod
    // So, we use the middelwares array and then spread the middleware
    // in teh applyMiddleware call as follows...
    //      applyMiddelware(...middlewares)

    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );

};

export default configureStore;



