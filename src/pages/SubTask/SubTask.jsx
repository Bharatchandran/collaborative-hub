import { useState, useEffect } from "react"
import * as subtaskAPI from  "../../utilities/subtask-api"
import { useParams } from "react-router-dom"
import SubTaskList from "../../components/SubTaskList/SubTaskList"
export default function SubTask() {
    const [newSubTask, setNewSubTask] = useState("")
    const [subTasks, setSubTasks] = useState([])
    const {commitId} = useParams()

    useEffect(function(){
        async function getAllSubTasks(commitId) {
            console.log(commitId)
            const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
            setSubTasks(allSubTasks)
        }
        getAllSubTasks(commitId)
    },[newSubTask])
console.log(subTasks)
    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log("handle")
        await subtaskAPI.createSubTask(newSubTask,commitId)
        setNewSubTask("")
    }
    return(
        <div>
        <div>
         <form onSubmit={handleSubmit} >
            <input required value={newSubTask} onChange={(evt) => setNewSubTask(evt.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </div>
        <div>
         <SubTaskList subTasks={subTasks} />
        </div>
        </div>
    )
}