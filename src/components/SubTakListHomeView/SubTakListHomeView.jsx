import { useState, useEffect } from "react";
import {Card, CardBody, Button, CardHeader, Checkbox} from "@nextui-org/react";
import * as subtaskAPI from  "../../utilities/subtask-api"
export default function SubTakListHomeView({commit, activeState, activeCommit, handleActiveState, commitId}) {
    const [newSubTask, setNewSubTask] = useState("")
  const [testTasks, setTestTasks] = useState([])
  const [taskCompleted, setTaskCompleted] = useState(-1)
  async function handleCompleteTask(evt,subtaskId){
    console.log(!!evt.value)
    const handleTask = await subtaskAPI.handleCompleteTask(subtaskId)
    setTaskCompleted(taskCompleted * -1)
    
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    await subtaskAPI.createSubTask(newSubTask,commitId)
    setNewSubTask("")
}

useEffect(function(){
    async function getAllSubTasks(commitId) {
        const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
        setTestTasks(allSubTasks)
    }
    getAllSubTasks(commitId)
},[newSubTask, taskCompleted])
    return(
<div>
{activeState === 1 && activeCommit === commitId?<Card className="bg-black border-1 -mt-4 rounded-tr-none rounded-tl-none rounded-none" >
<CardHeader className="w-full">
<form  className="w-full bg-black" onSubmit={handleSubmit} > <input  className="w-[410%] h-10 bg-black"  required value={newSubTask} onChange={(evt) => setNewSubTask(evt.target.value)} /></form>
</CardHeader>


{testTasks.map(subTask => <CardBody className="border-1 ">
  <div className="flex justify-between">
  {subTask.task} <Checkbox isSelected={subTask.completed? true: false} onClick={(evt)=> handleCompleteTask(evt,subTask._id)}   color="success">
    {subTask.completed === true ? <h1>Success</h1> : <h1>Not Completed</h1>}
    
    </Checkbox>
  </div>
  </CardBody>)}

</Card> : ""}
</div>    
    )
}