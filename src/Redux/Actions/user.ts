import { SET_USER, AppActions } from '../types/actions'
import { IUserProperties as User} from '../types/User'

export const setUser = ( user: User ): AppActions => ({
    type: SET_USER,
    user
})