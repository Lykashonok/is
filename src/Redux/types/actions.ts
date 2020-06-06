// import { CommonUser as User } from './User'
import {CommonUser} from '../../Classes/User'
export const SET_USER = 'SET_USER'

export interface SetUserAction{
    type: typeof SET_USER,
    user: CommonUser
}

export type UserActionTypes = SetUserAction // | smthUserAction

export type AppActions = UserActionTypes // | other actions in app