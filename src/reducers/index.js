import {combineReducers} from 'redux';
import courses from './courseReducer'; // Alias the export, because it's default export
import authors from './authorReducer'; // Alias the export, because it's default export

const rootReducer = combineReducers({
    courses,
    authors
});

export default rootReducer;