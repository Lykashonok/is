import * as types from '../types'

export const setUser = (user) => ({
    type : types.SETTING_USER,
    token : user.token,
    id : user.id,
    phone : user.phone,
    tasks : user.tasks
})