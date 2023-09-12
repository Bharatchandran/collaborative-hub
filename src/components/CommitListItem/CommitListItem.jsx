
import {Card, CardBody, Button, CardHeader} from "@nextui-org/react";
import { useState, useEffect } from "react";
import * as commitAPI from "../../utilities/commit-api"
import { getUser } from '../../utilities/users-service';
import * as subtaskAPI from  "../../utilities/subtask-api"
import SubTakListHomeView from "../SubTakListHomeView/SubTakListHomeView";

export default function CommitListItem({commit, activeState, activeCommit, handleActiveState, setProjectPush, projectPush}){
  const [user, setUser] = useState(getUser());
  const [newSubTask, setNewSubTask] = useState("")
  const [testTasks, setTestTasks] = useState([])
  const userId = user._id
  const [push, setPush] = useState("")
  const [pull, setPull] = useState(false)
  const [currUser, setCurrUser] = useState(getUser());
 const [buttonState, setButtonState] = useState(-1)
// console.log(projectPush)
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
  const handleTask = await subtaskAPI.handleCompleteTask(subtaskId)
}

  useEffect(function(){
      async function getAllSubTasks(commitId) {
          const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
          setTestTasks(allSubTasks)
      }

      async function findPull(commitId, userId){
        const pull = await commitAPI.findPull(commitId, userId)
        setPull(pull)
      }

      async function findPushed(commitId,userId){
        const pushCommit = await commitAPI.findPushed(commitId, userId)
        setPush(pushCommit)
        console.log(push)
      }

      getAllSubTasks(commit._id)
      findPushed(commit._id,userId)
      findPull(commit._id, userId)

  },[newSubTask, buttonState])

 

 
  function renderButton(){
    
    if(push && push.push === true && push.user === currUser._id){
      return <Button className="bg-success-300 hover:bg-success-200">pushed</Button>
  
   
    } else if (commit.push === false && commit.user._id === currUser._id) {
        return <Button className="bg-primary-300 hover:bg-primary-200" onClick={handlePushButton}>Push</Button>
    } else if (commit.push === true && commit.user._id != currUser._id ) {
        if(pull){
          return <Button className="bg-success-300 hover:bg-success-200">Pulled</Button>
        } else {
          return <Button onClick={handlePullButton} className="bg-secondary-300 hover:bg-secondary-200">Pull</Button>
        }
    } else if (commit.push === false && commit.user._id != currUser._id){
        return <Button className="bg-warning-300 hover:bg-warning-200" >In progress</Button>
    } 

  }

return(
  <div>
    <div className="min-h-unit-24 flex items-center relative" onClick={()=>{
          handleActiveState(commit._id,testTasks,currUser._id,commit.user._id)
      }}>
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
    <SubTakListHomeView commit={commit} activeState={activeState} activeCommit={activeCommit} handleActiveState={handleActiveState} commitId={commit._id}  />
    
  </div>
)
}