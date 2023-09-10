
import { useEffect, useState } from "react"
import * as projectAPI from "../../utilities/project-api"
import ProjectList from "../../components/ProjectList/ProjectList"
import JoinedProjectList from "../../components/JoinedProjectList/JoinedProjectList"
export default function Project() {
    const [newProject, setNewProject] = useState("")
    const [projects, setProjects] = useState([])
    const [joinedProjects, setJoinedProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    useEffect(function(){
        async function getAllProjects(){
            const allProjects = await projectAPI.getAllProjects()
            setProjects(allProjects)
        }
        getAllProjects()

        async function getAllJoinedProjects(){
            const joinedProjects = await await projectAPI.getAllJoinedProjects()
            setJoinedProjects(joinedProjects)
        }
        getAllJoinedProjects()
    },[newProject])
    
    async function handleSubmit(evt) {
        evt.preventDefault();
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
        <hr />
        {/* <JoinedProjectList joinedProjects={joinedProjects} /> */}
        <ProjectList projects={joinedProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />

        </div>)
}