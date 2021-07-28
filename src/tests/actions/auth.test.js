import {
    login,
    startLogin,
    logout,
    startLogout
} from "../../actions/auth";

test('should generate login action object', () => {
    const uid = '123abc';
    const action = login(uid);
    expect(action).toEqual({ type: 'LOGIN', uid });
});

test('should generate startLogin action object', () => {
    const action = startLogin();
    expect(action).toEqual(expect.any(Function));
});

test('should generate logout action object', () => {
    const action = logout();
    expect(action).toEqual({ type: 'LOGOUT' });
});

test('should generate startLogout action object', () => {
    const action = startLogout();
    expect(action).toEqual(expect.any(Function));
});