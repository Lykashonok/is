import { CommonUser, Customer, Admin, Seller} from "../../Classes/User";
import { UserActionTypes, SET_USER } from '../types/actions'

const userReducerDefaultState: CommonUser = new Customer();

const userReducer = (state = new Customer(), action: UserActionTypes): CommonUser => {
    switch (action.type) {
        case SET_USER:
            let newUser : CommonUser = action.user;
            // switch(action.user.type) {
            //     case 'customer':
            //         newUser = new Customer()
            //         break;
            //     case 'seller':
            //         newUser = new Seller()
            //         break;
            //     case 'admin':
            //         newUser = new Admin()
            //         break;
            // }
            return newUser
        default:
            return state
    }
}

export { userReducer };