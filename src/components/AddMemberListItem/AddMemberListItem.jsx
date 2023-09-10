import * as addmembersAPI from "../../utilities/addmembers-api"
export default function AddMemberListItem({user, projectId}) {
    async function handleClick() {
        // alert("clicked")
        await addmembersAPI.addUser(projectId,user._id)    
    }
    console.log(user)
    return(<div>
        
        {user.name}
        <br />
        {user._id}
        <button onClick={handleClick}>Add</button>
    </div>)
}