import * as types from '../types'

export function addTask(task){
    return {
        task: task,
        type: types.ADD_TASK
    }
}

export function removeTask(task){
    return {
        task: task,
        type: types.REMOVE_TASK
    }
}

export function setTasks(tasks){
    return {
        tasks: tasks,
        type: types.SET_TASKS
    }
}