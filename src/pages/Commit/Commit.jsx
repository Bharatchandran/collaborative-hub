import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as commitAPI from "../../utilities/commit-api"
import CommitList from "../../components/CommitList/CommitList";

import {Button, Input} from "@nextui-org/react";

export default function Commit(){
   
    const [newCommit, setNewCommit] = useState("")
    const[commits, setCommits] = useState([])
    const[createCommit, setCreateCommit] = useState(false)
    const [projectPush, setProjectPush] = useState(-1)
    let {projectId} = useParams();

    useEffect(function(){

        async function getAllCommits(projectId) {
            const allCommits = await commitAPI.getAllCommits(projectId)
            setCommits(allCommits)
        }

        getAllCommits(projectId)
        
    },[newCommit, projectPush])

    async function handleSubmit(evt) {
        evt.preventDefault();
        await commitAPI.createCommit(newCommit,projectId)
        setNewCommit("")
        setCreateCommit(!createCommit)
    }

    return(
        <div className="flex flex-col items-center">
            <div className="  flex justify-between items-center w-[67%] ml-4 mt-4 ">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Commits</span> </h1>

                <Button color="warning" onClick={()=> setCreateCommit(!createCommit)} >Create</Button>
            </div>
            {createCommit ? <div className="flex justify-center
             bg-opacity-60 rounded-xl absolute top-[30%]  w-[700px] z-40 h-[500px] bg-gray-600"> 
                <button className="absolute left-5 top-5" onClick={()=> setCreateCommit(!createCommit)}>X</button> 
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <h1 className="text-4xl -mt-10 mb-10">Create Project</h1>
                    <input className="w-[500px] mb-5 bg-gray-900 text-white" required value={newCommit} onChange={(evt) => setNewCommit(evt.target.value)} />
                    <Button color="primary" type="submit">Submit</Button>
                    </form>
            </div>
            :"" }
            <div className="flex  w-full justify-center">
                <CommitList key={"CommitListInCommit"} commits={commits} setProjectPush={setProjectPush} projectPush={projectPush}  />
            </div>
        </div>
        
    )
}

