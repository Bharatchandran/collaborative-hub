import { useState } from "react"
import { Card,CardHeader } from "@nextui-org/react"
import AddMemberListItem from "../AddMemberListItem/AddMemberListItem"
export default function AddMemberList({users, projectId, setAddMemberComplete, addMemberCompelete}) {
    const [ifmember, setIfMember] = useState("")
    
    const addMemberList = users.map( user =>{

         return <AddMemberListItem user={user} projectId={projectId} setAddMemberComplete={setAddMemberComplete} addMemberCompelete={addMemberCompelete}/>
        })
    return(
        <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-7/12 h-4/5   ">
            <CardHeader className="flex justify-center mt-10 mb-10 text-4xl">
                Add Members
            </CardHeader>
            <div className="flex flex-col items-center overflow-auto">

            {addMemberList}
            
           
            </div>
        </Card>
        </div>
    )
}