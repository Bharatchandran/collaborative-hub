import { useEffect } from "react"
import { useState } from "react"
import * as addmembersAPI from "../../utilities/addmembers-api"
import AddMemberList from "../../components/AddMemberList/AddMemberList"
import { useParams } from "react-router-dom"
export default function AddMembers(){
    const [users, setUsers] = useState([])
    const {projectId} = useParams()
    const [addMemberCompelete, setAddMemberComplete] = useState(false)

    useEffect(function(){
console.log(projectId,"++++++")
        async function getAllUsers(projectId){
            const allUsers = await addmembersAPI.getAllUsers(projectId)
            setUsers(allUsers)

        }

        getAllUsers(projectId)

    },[addMemberCompelete])

    return(
        <div>
            {users && users[0]?
            <div className="w-full min-h-screen flex justify-center items-center">
            <AddMemberList  setAddMemberComplete
            ={setAddMemberComplete} addMemberCompelete={addMemberCompelete} users={users} projectId={projectId}/>
            </div>
            :
            <div className="h-screen flex justify-center items-center">
            <h1 className="text-white text-4xl  "> No more user to add</h1></div> }
            
        </div>
    )
}