import { useEffect } from "react"

export default function JoinedProjectsListItem({joinedProject}) {
    useEffect(function(){

        console.log(joinedProject)
    },[])
    return (
        <div className="bg-red-700 m-12 h-12 ">
        <div>{joinedProject.user.name}-{joinedProject.project.name}</div>

        </div>
    )
}