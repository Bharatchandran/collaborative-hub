import sendRequest from './send-request';

const BASE_URL = '/api/projects';

export function createProject(newProject) {
    return sendRequest(`${BASE_URL}/create`, 'POST', {name: newProject})
} 

export function getAllProjects(){
    return sendRequest(`${BASE_URL}`)
}

export function getAllJoinedProjects(){
    return sendRequest(`${BASE_URL}/joined`)
}

export function getProjectOwner(userId){
    return sendRequest(`${BASE_URL}/${userId}`)
}