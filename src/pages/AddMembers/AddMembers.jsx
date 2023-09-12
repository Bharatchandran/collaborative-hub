import { useEffect } from "react"
import { useState } from "react"
import * as addmembersAPI from "../../utilities/addmembers-api"
import AddMemberList from "../../components/AddMemberList/AddMemberList"
import { useParams } from "react-router-dom"
export default function AddMembers(){
    const [users, setUsers] = useState([])
    const {projectId} = useParams()

    useEffect(function(){

        async function getAllUsers(){
            const allUsers = await addmembersAPI.getAllUsers()
            setUsers(allUsers)

        }

        getAllUsers()

    },[])

    return(
        <div>
            <AddMemberList users={users} projectId={projectId}/>
        </div>
    )
}