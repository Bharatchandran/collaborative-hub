
import {Card, CardBody, Button, CardHeader} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as commitAPI from "../../utilities/commit-api"
import { getUser } from '../../utilities/users-service';

import {Checkbox} from "@nextui-org/react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import * as subtaskAPI from  "../../utilities/subtask-api"
import {Input} from "@nextui-org/react";
import SubTakListHomeView from "../SubTakListHomeView/SubTakListHomeView";

export default function CommitListItem({commit, activeState, activeCommit, handleActiveState, setProjectPush, projectPush}){
  const [user, setUser] = useState(getUser());
  const [newSubTask, setNewSubTask] = useState("")
  const [testTasks, setTestTasks] = useState([])
  const commitId = commit._id
  const userId = user._id
  const [push, setPush] = useState("")
  const [pull, setPull] = useState(false)
  const [currUser, setCurrUser] = useState(getUser());
 const [buttonState, setButtonState] = useState(-1)
// console.log(projectPush)
console.log(commitId)
  async function handlePushButton(){
    const pushCommit = await commitAPI.pushCommit(commit._id, commit.user)
    setProjectPush(projectPush * -1)
    setButtonState(buttonState * -1)
  }
  async function handlePullButton(){
    const pushCommit = await commitAPI.pullCommit(commit._id, currUser._id)
    setPull(true)
    setButtonState(buttonState * -1)

  }
async function handleCompleteTask(evt,subtaskId){
  console.log(!!evt.value)
  const handleTask = await subtaskAPI.handleCompleteTask(subtaskId)
}

  useEffect(function(){
      async function getAllSubTasks(commitId) {
          const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
          setTestTasks(allSubTasks)
      }
      getAllSubTasks(commit._id)

      async function findPull(commitId, userId){
        const pull = await commitAPI.findPull(commitId, userId)
        setPull(pull)
      }
      // console.log(commitId)
      async function findPushed(commitId,userId){
      
        const pushCommit = await commitAPI.findPushed(commitId, userId)
        setPush(pushCommit)
        console.log(push)
      }
      findPushed(commit._id,userId)
      findPull(commit._id, userId)
  },[newSubTask, buttonState])

  async function handleSubmit(evt) {
      evt.preventDefault();
      await subtaskAPI.createSubTask(newSubTask,commitId)
      setNewSubTask("")
  }

 
  function renderButton(){
    
    if(push && push.push === true && push.user === currUser._id){
      console.log(push,"+++++")
     return <Button className="bg-success-300 hover:bg-success-200">pushed</Button>
  
   
  } else if (commit.push === false && commit.user._id === currUser._id) {
        return <Button className="bg-primary-300 hover:bg-primary-200" onClick={handlePushButton}>Push</Button>
    }
     else if (commit.push === true && commit.user._id != currUser._id ) {
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
  // function renderButton(){
  //   if (commit.push === false && commit.user._id === currUser._id) {
  //       return <Button className="bg-primary-300 hover:bg-primary-200" onClick={handlePushButton}>Push</Button>
  //   } else if(commit.push === true && commit.user._id === currUser._id){
  //     return <Button className="bg-success-300 hover:bg-success-200">pushed</Button>
   
  //   } else if (commit.push === true && commit.user._id != currUser._id ) {
  //     if(pull){
  //       return <Button className="bg-success-300 hover:bg-success-200">Pulled</Button>
  //     } else {

  //       return <Button onClick={handlePullButton} className="bg-secondary-300 hover:bg-secondary-200">Pull</Button>
  //     }
  //   } 
  //    else if (commit.push === false && commit.user._id != currUser._id){
  //     return <Button className="bg-warning-300 hover:bg-warning-200" >In progress</Button>
  //   } 

  // }

  
return(





<div>
  <div className="min-h-unit-24 flex items-center relative" onClick={()=>{
         handleActiveState(commitId,testTasks,currUser._id,commit.user._id)

    }}>
  {/* <button onClick={setActiveState(activeState * -1)}> */}
<Card  className="basis-full min-h-unit-24 mt-5   flex-row items-center">
<CardBody   className="justify-center relative"  >
  <div className="absolute text-slate-300 -top-1 z-40">@{commit.user.name}</div>
  <div className="text-2xl" >{commit.name}</div>
  
</CardBody>
<div className="flex">
{renderButton()}




{/* <Button> <Link to={`commit/${commit._id}`}><h1 className="text-white">sub tasks</h1></Link></Button> */}
</div>
</Card>
{testTasks && currUser._id === commit.user._id?<span className="material-symbols-outlined absolute -right-10 rounded-full mt-5  bg-gray-800">
expand_more
</span> : "" }

</div>

<SubTakListHomeView commit={commit} activeState={activeState} activeCommit={activeCommit} handleActiveState={handleActiveState} commitId={commitId}  />
{/* 
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

</Card> : ""} */}

{/* </button> */}
           
<div>
  
</div>
</div>
)
}