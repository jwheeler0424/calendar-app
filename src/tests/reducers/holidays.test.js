import holidaysReducer from "../../reducers/holidays";

test('should setup default holiday values', () => {
    const state = holidaysReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([]);
});