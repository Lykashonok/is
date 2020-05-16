import { IUserProperties as User } from './User'
export const SET_USER = 'SET_USER'

export interface SetUserAction{
    type: typeof SET_USER,
    user: User
}

export type UserActionTypes = SetUserAction // | smthUserAction

export type AppActions = UserActionTypes // | other actions in app