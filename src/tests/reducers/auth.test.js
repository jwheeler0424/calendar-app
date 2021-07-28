import authReducer from '../../reducers/auth';

test('should setup default auth values', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should login with uid', () => {
    const uid = '123abc';
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({ uid })
})

test('should logout with empty object', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({});
})