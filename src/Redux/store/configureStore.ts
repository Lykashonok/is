import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { userReducer } from '../Reducers/user'
import { AppActions } from '../types/actions';

export const rootReducer = combineReducers({
    user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))