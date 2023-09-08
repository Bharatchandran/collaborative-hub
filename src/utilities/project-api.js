import sendRequest from './send-request';

const BASE_URL = '/api/projects';

export function createProject(newProject) {
    console.log("api1")
    return sendRequest(`${BASE_URL}/create`, 'POST', {name: newProject})
} 

export function getAllProjects(){
    return sendRequest(`${BASE_URL}`)
}