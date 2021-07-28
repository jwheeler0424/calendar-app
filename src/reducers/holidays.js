const holidaysReducerDefaultState = [];

const holidaysReducer = (state = holidaysReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export { holidaysReducer as default };