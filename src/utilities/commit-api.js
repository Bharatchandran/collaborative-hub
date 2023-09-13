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

export function pullCommit() {
    return sendRequest(`${BASE_URL}/pull`,'POST')
}

export function findPushed(commitId, userId){
    return sendRequest(`${BASE_URL}/pushed/find`,'POST',{commitId, userId})
}
export function findPull(commitId, userId){
    return sendRequest(`${BASE_URL}/pull/find`,'POST',{commitId, userId})
}

export function getAllPulledUsers(commitId){
    return sendRequest(`${BASE_URL}/${commitId}/findPulledUsers`)

}


export function handleEditSubmit(commitId, editCommit){
    return sendRequest(`${BASE_URL}/${commitId}/edit`, 'POST', {commitId, editCommit})

}

export function getCommit(commitId){
    return sendRequest(`${BASE_URL}/${commitId}/get`)
}

export function handleDelete(commitId){
    console.log("delete")
    return sendRequest(`${BASE_URL}/commit/delete`, 'POST', {commitId})
}