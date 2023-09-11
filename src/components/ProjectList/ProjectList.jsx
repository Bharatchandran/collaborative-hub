
import { button } from "@nextui-org/react"
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem"
import { useState } from "react"
export default function ProjectList({projects , selectedProject, setSelectedProject}) {
    const [active, setActive] = useState(-1)
    const projectList = projects.map((project) => <ProjectListItem project={project} selectedProject={selectedProject} active={active} />)

    // const projectList = projects.map((project) => <button onClick={() =>{
    //     // if (selectedProject === project._id) setActive(-1)
    //     if(active === 1) setActive(-1) 
    //     setSelectedProject(project._id)
    //      setActive(active*-1)
         
    // }
    // }><ProjectListItem project={project} selectedProject={selectedProject} active={active} /></button>)
    return (
    <div className="w-10/12 flex flex-col items-center ">
        {projectList}
    </div>
)
}