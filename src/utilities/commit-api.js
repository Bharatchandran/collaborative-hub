import sendRequest from './send-request';

const BASE_URL = '/api/project';

export function createCommit(newCommit, projectId) {
    console.log("api")
    return sendRequest(`${BASE_URL}/${projectId}/create`, 'POST', {name: newCommit})
} 

export function getAllCommits(projectId){
    return sendRequest(`${BASE_URL}/${projectId}`)
}