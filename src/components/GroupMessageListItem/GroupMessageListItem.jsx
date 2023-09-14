import { divider } from "@nextui-org/react";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
export default function GroupMessageListItem({message}){
    const [currUser, setCurrUser] = useState(getUser())
    return(<div className="mb-2">
       {message.user._id === currUser._id ?<div className="flex justify-end"> <ChatBubble message={message} direction={"end"}  /> </div>
       :
        <div className="flex justify-start"> <ChatBubble  message={message} direction={"start"} /></div>}

        
    </div>)
}