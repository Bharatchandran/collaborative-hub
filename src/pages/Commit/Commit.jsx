import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as commitAPI from "../../utilities/commit-api"
import CommitList from "../../components/CommitList/CommitList";

export default function Commit(){
   
    const [newCommit, setNewCommit] = useState("")
    const[commits, setCommits] = useState([])
    let {projectId} = useParams();

    useEffect(function(){
        async function getAllCommits(projectId) {
            const allCommits = await commitAPI.getAllCommits(projectId)
            setCommits(allCommits)
        }
        getAllCommits(projectId)
    },[newCommit])
    async function handleSubmit(evt) {
        evt.preventDefault();
        await commitAPI.createCommit(newCommit,projectId)
        setNewCommit("")
    }
    return(
        <div>
        <div>
         <form onSubmit={handleSubmit} >
            <input value={newCommit} onChange={(evt) => setNewCommit(evt.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </div>
        <div>
        <CommitList commits={commits}  />
        </div>
        </div>
    )
}