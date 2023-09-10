import JoinedProjectListItem from "../JoinedProjectListItem/JoinedProjectListItem"

export default function JoinedProjectList({joinedProjects}){
const joinedProjectsList = joinedProjects.map(jp => <JoinedProjectListItem joinedProject={jp} />)

    return(<div>{joinedProjectsList}</div>)
}