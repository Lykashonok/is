import * as types from '../types';
import * as AsyncStorageManager from '../../Assets/AsyncStorageManager'

const initialState = {
    current: [],
    deleted: [],
    finished: []
}

const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_TASK: {
            let newState = {...state}
            newState[action.task.type].push(action.task);
            
            AsyncStorageManager.storeDataArray('@tasks', newState)

            return newState;
        }
        case types.REMOVE_TASK: {
            let newState = {...state};
            newState[action.task.type] = []

            state[action.task.type].map((value, i) => {
                console.log(value, '\n\n\n', action.task, value == action.task)
                if(value != action.task) newState[action.task.type].push(value);
            })

            AsyncStorageManager.storeDataArray('@tasks', newState)

            return newState;
        }
        case types.SET_TASKS: {
            if(!action.tasks) action.tasks = initialState

            AsyncStorageManager.storeDataArray('@tasks', action.tasks)
            
            return action.tasks
        }
        default: return state
    }
}

export default tasksReducer