import sendRequest from './send-request';

const BASE_URL = '/api/project/messageGroup';

export function createMessage(projectId, userId, newMessage) {
    console.log(projectId, userId, newMessage)
    return sendRequest(`${BASE_URL}/message`,'POST',{projectId, userId, newMessage })
}

export function getMessages(projectId){
    return sendRequest(`${BASE_URL}/${projectId}`)
}