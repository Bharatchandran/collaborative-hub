import sendRequest from './send-request';

const BASE_URL = '/api/commit';

export function createSubTask(newSubTask, commitId) {
    return sendRequest(`${BASE_URL}/${commitId}/create`, 'POST', {task: newSubTask})
} 

export function getAllSubTasks(commitId){
    return sendRequest(`${BASE_URL}/${commitId}`)
}

export function handleCompleteTask(subtaskId){
    return sendRequest(`${BASE_URL}/findSubtask`,'POST',{subtaskId})
}