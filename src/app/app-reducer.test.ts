import {appReducer, setErrorAC, setStatusAC} from "./app-reducer";


test('app status should be changed to "loading"', () => {
    const action = setStatusAC("loading");
    const endState = appReducer({
        status: 'idle',
        error: null
    }, action)

    expect(endState.status).toBe("loading");
    expect(endState.error).toBe(null);

});
test('app error should be changed to "no connection"', () => {
    const action = setErrorAC("no connection");
    const endState = appReducer({
        status: 'idle',
        error: null
    }, action)

    expect(endState.status).toBe('idle');
    expect(endState.error).toBe("no connection");

});