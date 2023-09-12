
import { useEffect, useState } from "react"
import * as projectAPI from "../../utilities/project-api"
import ProjectList from "../../components/ProjectList/ProjectList"
import JoinedProjectList from "../../components/JoinedProjectList/JoinedProjectList"

import {Button, Input} from "@nextui-org/react";

export default function Project() {
    const [newProject, setNewProject] = useState("")
    
    const [projects, setProjects] = useState([])
    const [createProject, setCreateProject] = useState(false)
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
        setCreateProject(!createProject)
    }

    return(<div className="flex flex-col items-center relative">
       
        <div className="flex justify-between items-center w-[70%] ml-4 ">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Projects</span> </h1>
            <button onClick={()=> setCreateProject(!createProject)} >+</button>
            </div>
        {createProject ? <div className="flex justify-center bg-opacity-90 rounded-xl absolute top-[30%]  w-[700px] z-40 h-[500px] bg-black ">
        <Button className="absolute left-5 top-5" onClick={()=> setCreateProject(!createProject)}>X</Button>    
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <h1 className="text-4xl -mt-10 mb-10">Create Project</h1>
            <input className="w-[500px] mb-5 bg-gray-900 text-white" required value={newProject} onChange={(evt) => setNewProject(evt.target.value)} />
            <Button color="primary" type="submit">Submit</Button>
        </form>
        </div> : ""}
        
        {/* <ProjectList projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} /> */}
        <hr />
        {/* <JoinedProjectList joinedProjects={joinedProjects} /> */}
        <ProjectList key={"ProjectListInProject"} projects={joinedProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject}  />

        </div>)
}