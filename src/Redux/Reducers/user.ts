import { IUserProperties as User } from "../types/User";
import { UserActionTypes, SET_USER } from '../types/actions'

const userReducerDefaultState: User = {
    adress: '', email: '', id: -1, image: '', username: ''
};

const userReducer = (state = userReducerDefaultState, action: UserActionTypes): User => {
    switch (action.type) {
        case SET_USER:
            return {
                ...action.user
            }
        default:
            return state
    }
}

export { userReducer };