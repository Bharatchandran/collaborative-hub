import AddMemberListItem from "../AddMemberListItem/AddMemberListItem"
export default function AddMemberList({users, projectId}) {
    const addMemberList = users.map( user => <AddMemberListItem user={user} projectId={projectId}/>)
    return(
        <div>
            {addMemberList}
        </div>
    )
}