import * as addmembersAPI from "../../utilities/addmembers-api"
export default function AddMemberListItem({user, projectId}) {
    async function handleClick() {
        await addmembersAPI.addUser(projectId)    
    }
    return(<div>User

        <button onClick={handleClick}>Add</button>
    </div>)
}