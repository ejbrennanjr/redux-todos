import {createStore} from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';
import {loadState, saveState} from './localStorage';


const configureStore = () => {

    const perisistedState = loadState();
    const store = createStore(todoApp, perisistedState);

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));


    store.subscribe(throttle(() => {
    console.log("new state = " + JSON.stringify(store.getState()));
    }, 1000));

    return store;
};

export default configureStore;



