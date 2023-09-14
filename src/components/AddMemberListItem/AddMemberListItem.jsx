import { useEffect, useState } from "react"
import * as addmembersAPI from "../../utilities/addmembers-api"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
export default function AddMemberListItem({user, projectId, setAddMemberComplete, addMemberCompelete}) {
    const [memberExist, setMemberExist] = useState(false)
    async function handleClick() {
        // alert("clicked")
        await addmembersAPI.addUser(projectId,user._id)
        console.log("add ")   
        setAddMemberComplete(!addMemberCompelete) 
    }

    
    return(
    // <div>
        
    //     {user.name}
    //     <br />
    //     {user._id}
    //     <button onClick={handleClick}>Add</button>
    // </div>
    
              <CardBody className="w-7/12 border-1 rounded-2xl m-6">
                <div className="flex items-center justify-between" >
                <div>{user.name}</div>
                <button onClick={handleClick}>add</button>
                </div>
              </CardBody>
    )
}