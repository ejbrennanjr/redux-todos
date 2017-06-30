import {combineReducers} from 'redux';
import courses from './courseReducer'; // Alias the export, because it's default export

const rootReducer = combineReducers({
    courses 
});

export default rootReducer;