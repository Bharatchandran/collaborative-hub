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
            const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
            console.log(commitId)
            console.log(allSubTasks)
            setSubTasks(allSubTasks)
        }
        getAllSubTasks(commitId)
    },[newSubTask])
    async function handleSubmit(evt) {
        evt.preventDefault();
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
         <SubTaskList key={"SubTaskListInSubTask"} subTasks={subTasks} />
        </div>
        </div>
    )
}