import { SET_USER, AppActions } from '../types/actions'
import { CommonUser as User} from '../../Classes/User'

export const setUser = ( user: User ): AppActions => ({
    type: SET_USER,
    user
})