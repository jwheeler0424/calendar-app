import eventsReducer from '../../reducers/events';

test('should setup default event values', () => {
    const state = eventsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});