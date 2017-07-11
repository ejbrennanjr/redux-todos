
// This is a simplified implementation of the redux combineReducers function
export const combineReducers = (reducers) => {
    return (state={}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key], 
                    action
                );
                return nextState;
            },
            {}
        );
    };
};