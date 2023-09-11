import sendRequest from './send-request';

const BASE_URL = '/api/project';

export function createCommit(newCommit, projectId) {
    return sendRequest(`${BASE_URL}/${projectId}/create`, 'POST', {name: newCommit})
} 

export function getAllCommits(projectId){
    return sendRequest(`${BASE_URL}/${projectId}`)
}

export function pushCommit(commitId, userId) {
    return sendRequest(`${BASE_URL}/push`,'POST',{commitId, userId})
}

export function pullCommit(commitId, userId) {
    return sendRequest(`${BASE_URL}/pull`,'POST',{commitId, userId})
}

export function findPull(commitId, userId){
    return sendRequest(`${BASE_URL}/pull/find`,'POST',{commitId, userId})
}
