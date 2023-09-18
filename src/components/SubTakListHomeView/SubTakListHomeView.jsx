import { useState, useEffect } from "react";
import {Card, CardBody, Button, CardHeader, Checkbox} from "@nextui-org/react";
import * as subtaskAPI from  "../../utilities/subtask-api"
import { getUser } from '../../utilities/users-service';
export default function SubTakListHomeView({commit, activeState, activeCommit,  commitId}) {
  const [newSubTask, setNewSubTask] = useState("")
  const [testTasks, setTestTasks] = useState([])
  const [taskCompleted, setTaskCompleted] = useState(-1)
  const [user, setUser] = useState(getUser());

  async function handleCompleteTask(evt,subtaskId){
    const taskStatus = !!evt.isSelected
    console.log(taskStatus)
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
            {activeState === 1 && activeCommit === commitId ? 
                    <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-0 border-stone-700 -mt-4 rounded-tr-none rounded-tl-none rounded-none" >
                        {commit.user._id === user._id && commit.push != true ? 
                            <CardHeader className="w-full">
                                <form  className="w-full  bg-slate-900" onSubmit={handleSubmit} > 
                                    <input placeholder="Enter subtask" className="w-[405%] text-white h-10 bg-slate-900 "  required value={newSubTask} onChange={(evt) => setNewSubTask(evt.target.value)} />
                                </form>
                            </CardHeader> :""}
                        { testTasks.map(subTask => <CardBody className="border-2 border-stone-700 ">
                            <div className="flex text-xl font-bold justify-between">
                                {subTask.task}
                                {commit.user._id === user._id && commit.push === false ? 
                                        <Checkbox isSelected={subTask.completed? true: false} onClick={(evt)=> handleCompleteTask(evt,subTask._id)}   color="success">
                                            {subTask.completed === true ?
                                                    <h1>Success</h1> 
                                                : 
                                                    <h1>Not Completed</h1>
                                            }
                                        </Checkbox> 
                                    : 
                                        <div >
                                            {subTask.completed === true ? 
                                                    <Checkbox isSelected={true} color="success">Success</Checkbox> 
                                                : 
                                                    <h1>Not Completed</h1>
                                            }
                                        </div> 
                                }
                            </div>
                            </CardBody>)}
                    </Card> 
                : 
                    ""
            }
        </div>    
    )
}