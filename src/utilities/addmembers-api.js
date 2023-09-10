import sendRequest from './send-request';

const BASE_URL = '/api/project/addmembers';

export function addUser(projectId, userId) {
    
    return sendRequest(`${BASE_URL}/addUser`,'POST',{projectId, userId })
}

export function getAllUsers(){
    return sendRequest(`${BASE_URL}/users`)
}