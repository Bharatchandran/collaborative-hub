
import { useEffect, useState } from "react"
import * as projectAPI from "../../utilities/project-api"
import ProjectList from "../../components/ProjectList/ProjectList"
import JoinedProjectList from "../../components/JoinedProjectList/JoinedProjectList"

import {Button, Input} from "@nextui-org/react";

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

    return(<div className="flex flex-col items-center">
        CollaborateProject
        <div>
        <form className="flex items-center" onSubmit={handleSubmit}>
            <Input required value={newProject} onChange={(evt) => setNewProject(evt.target.value)} />
            <Button type="submit">Submit</Button>
        </form>
        </div>
        {/* <ProjectList projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} /> */}
        <hr />
        {/* <JoinedProjectList joinedProjects={joinedProjects} /> */}
        <ProjectList key={"ProjectListInProject"} projects={joinedProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />

        </div>)
}