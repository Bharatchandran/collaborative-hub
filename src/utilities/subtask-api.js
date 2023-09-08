import sendRequest from './send-request';

const BASE_URL = '/api/commit';

export function createSubTask(newSubTask, commitId) {
    console.log("api")
    return sendRequest(`${BASE_URL}/${commitId}/create`, 'POST', {task: newSubTask})
} 

export function getAllSubTasks(commitId){
    console.log(`${BASE_URL}/${commitId}`)
    return sendRequest(`${BASE_URL}/${commitId}`)
}