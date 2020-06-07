import { CommonUser, Customer, Admin, Seller} from "../../Classes/User";
import { UserActionTypes, SET_USER } from '../types/actions'

let userReducerDefaultState: CommonUser = new Customer();

const userReducer = (state = userReducerDefaultState, action: UserActionTypes): CommonUser => {
    switch (action.type) {
        case SET_USER:
            let newUser : CommonUser = action.user;
            return newUser
        default:
            return state
    }
}

export { userReducer };