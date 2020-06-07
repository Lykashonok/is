import { SET_USER, AppActions } from '../types/actions'
import { CommonUser } from '../../Classes/User'

export const setUser = ( user: CommonUser ): AppActions => ({
    type: SET_USER,
    user
})