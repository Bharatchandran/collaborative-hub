
import { button } from "@nextui-org/react"
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem"
import { useState } from "react"
export default function ProjectList({projects , selectedProject, setSelectedProject, setProjectPush,reloadProject, setReloadProject}) {
    const [active, setActive] = useState(-1)
    const projectList = projects.map((project) => <ProjectListItem key={project._id} project={project} selectedProject={selectedProject} active={active} reloadProject={reloadProject} setReloadProject={setReloadProject}  />)
    return (
    <div className="w-10/12 flex flex-col items-center  ">
        {projectList}
        
    </div>
)
}