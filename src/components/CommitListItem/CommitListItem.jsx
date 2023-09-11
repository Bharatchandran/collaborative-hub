
import {Card, CardBody, Button} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as commitAPI from "../../utilities/commit-api"
import { getUser } from '../../utilities/users-service';


import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import * as subtaskAPI from  "../../utilities/subtask-api"
import {Input} from "@nextui-org/react";

export default function CommitListItem({commit}){
  const [user, setUser] = useState(getUser());
  const [newSubTask, setNewSubTask] = useState("")
  const [testTasks, setTestTasks] = useState([])
  const commitId = commit._id
  const userId = user._id
  const [push, setPush] = useState(false)
  const [pull, setPull] = useState(false)
  const [currUser, setCurrUser] = useState(getUser());
 
  async function handlePushButton(){
    const pushCommit = await commitAPI.pushCommit(commit._id, commit.user)
    setPush(true)
  }
  async function handlePullButton(){
    const pushCommit = await commitAPI.pullCommit(commit._id, currUser._id)
  }


  useEffect(function(){
      async function getAllSubTasks(commitId) {
          const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
          console.log(allSubTasks, commitId)
          setTestTasks(allSubTasks)
          console.log(testTasks)
      }
      getAllSubTasks(commitId)
      
      async function findPull(commitId, userId){
        const pull = await commitAPI.findPull(commitId, userId)
        setPull(pull)
      }
      findPull(commitId, userId)
  },[newSubTask, push])
  async function handleSubmit(evt) {
      evt.preventDefault();
      await subtaskAPI.createSubTask(newSubTask,commitId)
      setNewSubTask("")
  }

 
  function renderButton(){
    if (commit.push === false && commit.user._id === currUser._id) {
      return <Button className="bg-primary-300 hover:bg-primary-200" onClick={()=> setPush(true)}>Push</Button>
    } else if(commit.push === true && commit.user._id === currUser._id){
      return <Button className="bg-success-300 hover:bg-success-200">pushed</Button>
   
    } else if (commit.push === true && commit.user._id != currUser._id && commit.push === true) {
      if(pull){
        return <Button className="bg-success-300 hover:bg-success-200">Pulled</Button>
      } else {

        return <Button onClick={handlePullButton} className="bg-secondary-300 hover:bg-secondary-200">Pull</Button>
      }
    } 
     else if (commit.push === false && commit.user._id != currUser._id){
      return <Button className="bg-warning-300 hover:bg-warning-200" >In progress</Button>
    } 

  }
return(





<div>
<Card className=" min-h-unit-24 mt-5 mb-5 flex-row items-center">
<CardBody className="justify-center" >
  <div>{commit.name}</div>
</CardBody>
<div className="flex">
{renderButton()}
<Button> <Link to={`commit/${commit._id}`}><h1 className="text-white">sub tasks</h1></Link></Button>
</div>
</Card>
<h1>{commit.pull.toString()} {commit.pull.toString()}</h1>

<form onSubmit={handleSubmit} > <Input  required value={newSubTask} onChange={(evt) => setNewSubTask(evt.target.value)} /></form>
           
<div>
  {testTasks.map(subTask => <h1>{subTask.task}</h1>)}
</div>
</div>
)
}