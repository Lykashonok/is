import * as types from '../types';

const initialState = {
    token: '',
    id: '',
    phone: '',
    tasks: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SETTING_USER:
            return {
                ...state,
                token : action.token,
                id : action.id,
                phone : action.phone,
                tasks : action.tasks
            }
        default: return state
    }
}

export default userReducer