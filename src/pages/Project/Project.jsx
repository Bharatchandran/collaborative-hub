
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
    const [reloadProject, setReloadProject] = useState(-1)
    const [newProjectDescription, setNewProjectDescription] = useState("")
    useEffect(function(){
        async function getAllProjects(){
            const allProjects = await projectAPI.getAllProjects()
            console.log(allProjects)
            setProjects(allProjects)
        }
        getAllProjects()
        console.log(projects)

        async function getAllJoinedProjects(){
            const joinedProjects = await await projectAPI.getAllJoinedProjects()
            setJoinedProjects(joinedProjects)
            console.log("joined",joinedProjects)
        }
        getAllJoinedProjects()
    },[newProject,reloadProject])
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        await projectAPI.createProject(newProject, newProjectDescription)
        setNewProject("")
        setNewProjectDescription("")
        setCreateProject(!createProject)
    }

    return(
    <div className="flex flex-col items-center   ">
       
        <div className="flex justify-between items-center w-[70%] ml-4  mt-4">
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Projects</span> </h1>
            <Button color="warning" onClick={()=> setCreateProject(!createProject)} >Create</Button>
        </div>
        {createProject ? <div className="flex justify-center bg-opacity-90 rounded-xl absolute top-[30%]  w-[700px] z-40 h-[500px] bg-gray-700 ">
        <Button color="warning" className="absolute left-5 top-5" onClick={()=> setCreateProject(!createProject)}>X</Button>    
        <form className="flex flex-col justify-center items-center p-10" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-white font-bold relative top-7 -mt-10 mb-10">Create Project</h1>
            <label className="text-white font-bold" >Name</label>
            <input className="w-[500px] mb-5 bg-gray-900 text-white" required value={newProject} onChange={(evt) => setNewProject(evt.target.value)} />
            <label className="text-white font-bold">Description</label>
            <textarea className="w-full text-white h-40 bg-gray-900" type="text" required value={newProjectDescription} onChange={(evt) => setNewProjectDescription(evt.target.value)} />
            <Button color="primary" type="submit">Submit</Button>
        </form>
        </div> : ""}
        {joinedProjects && joinedProjects[0]?
        <ProjectList key={"ProjectListInProject"} projects={joinedProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject}  reloadProject={reloadProject} setReloadProject={setReloadProject} />
        :
        ""
        }
    </div>)
}