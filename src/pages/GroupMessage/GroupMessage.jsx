import { Button, Input } from "@nextui-org/react"
import * as groupmessageAPI from "../../utilities/groupmessage-api"
import { getUser } from '../../utilities/users-service';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GroupMessageList from "../../components/GroupMessageList/GroupMessageList";

export default function GroupMessage(){

    let {projectId} = useParams();
    const [currUser, setCurrUser] = useState(getUser());
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(function() {
        async function getMessages(projectId){
            const messages = await groupmessageAPI.getMessages(projectId)
            setMessages(messages)
            console.log(projectId)
        }
        getMessages(projectId)
        console.log(messages)
    },[newMessage])

    async function handleMessageSend(evt){
        evt.preventDefault()
        console.log("test")
        const message =  await groupmessageAPI.createMessage( projectId,currUser._id, newMessage)
        setNewMessage("")
    }
    return( <div className="flex items-center justify-center min-h-screen">
        




        <div className=" flex w-5/12 h-[1000px] mt-[-200px]  flex-col-reverse">
        <form className="w-full flex" onSubmit={handleMessageSend}>
            <div className="w-full mb-2">
            <div className="flex justify-center items-center ">
            <div className="w-9/12 mr-4 flex  justify-center "><input required className="w-full text-white bg-stone-700" type="text"  value={newMessage} onChange={(evt)=>setNewMessage(evt.target.value)} /></div>
           
            {/* <button type="submit" className="rounded-xl h-full ml-4  w-1/12">x</button>
             */}
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Send</button>
            </div>
            </div>
        </form>
        <div className=" flex  h-[750px]   justify-center ">
        <GroupMessageList messages={messages} />
        </div>

        </div>
        
        </div>)

}