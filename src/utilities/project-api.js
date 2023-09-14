import sendRequest from './send-request';

const BASE_URL = '/api/projects';

export function createProject(newProject, description) {
    return sendRequest(`${BASE_URL}/create`, 'POST', {name: newProject, description})
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

export function getProjectMembers(projectId) {
    
    return sendRequest(`${BASE_URL}/${projectId}/findMembers`)
}

export function getProject(projectId){
    return sendRequest(`${BASE_URL}/${projectId}/get`)
}

export function handleDelete(projectId){
    console.log("delete")
    return sendRequest(`${BASE_URL}/project/delete`, 'POST', {projectId})
}

export function handleEditSubmit(projectId, editProject, editDescription){
    console.log(projectId)
    return sendRequest(`${BASE_URL}/${projectId}/edit`, 'POST', {projectId, editProject, editDescription})
}