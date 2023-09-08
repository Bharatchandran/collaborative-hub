
import { useEffect, useState } from "react"
import * as projectAPI from "../../utilities/project-api"
import ProjectList from "../../components/ProjectList/ProjectList"
export default function Project() {
    const [newProject, setNewProject] = useState("")
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    useEffect(function(){
        async function getAllProjects(){
            const allProjects = await projectAPI.getAllProjects()
            setProjects(allProjects)
        }
        getAllProjects()
    },[newProject])
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log("handle sub,mit")
        await projectAPI.createProject(newProject)
        setNewProject("")
    }

    return(<div>
        CollaborateProject
        <div>
        <form onSubmit={handleSubmit}>
            <input required value={newProject} onChange={(evt) => setNewProject(evt.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </div>
        <ProjectList projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        </div>)
}