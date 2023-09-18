
import {Card, CardBody, Button, Avatar, AvatarGroup, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger} from "@nextui-org/react";
import { useState, useEffect } from "react";
import * as commitAPI from "../../utilities/commit-api"
import { getUser } from '../../utilities/users-service';
import * as subtaskAPI from  "../../utilities/subtask-api"
import SubTakListHomeView from "../SubTakListHomeView/SubTakListHomeView";

export default function CommitListItem({commit, activeState, activeCommit, handleActiveState, pull, reloadCommit, setReloadCommit}){

  const [user, setUser] = useState(getUser());
  const [testTasks, setTestTasks] = useState([])
  const [push, setPush] = useState("")
  const [thisCommit, setThisCommit] = useState([])
  const [pulledCommit, setPulledCommit] = useState(false)
  const [currUser, setCurrUser] = useState(getUser());
 const [buttonState, setButtonState] = useState(-1)
 const [pulledUsers, setPulledUsers] = useState([])
 const [editState, setEditState] = useState(false)
 const[editComplete, setEditComplete] = useState("")
 const [editCommit, setEditCommit] = useState("")

async function handlePushButton(){
    const pushCommit = await commitAPI.pushCommit(commit._id, commit.user)
    setReloadCommit(!reloadCommit)
    setButtonState(buttonState * -1)
  }
  
async function handleCompleteTask(evt,subtaskId){
  const handleTask = await subtaskAPI.handleCompleteTask(subtaskId)
}

async function handleSubmit(evt) {
  evt.preventDefault()
  handleEditSubmit(commit._id, editCommit)
  setEditState(!editState)
}

async function handleEditSubmit(commitId, editCommit){
  const commit = await commitAPI.handleEditSubmit(commitId, editCommit)
  setEditComplete("complete")
}

async function handleDelete(commitId) {
  await commitAPI.handleDelete(commitId)
  setReloadCommit(!reloadCommit)
}

useEffect(function(){
    async function getAllSubTasks(commitId) {
        const allSubTasks = await subtaskAPI.getAllSubTasks(commitId)
        setTestTasks(allSubTasks)
    }

    async function findPull(commitId, userId){
      const pull = await commitAPI.findPull(commitId, userId)
      setPulledCommit(pull)
    }

    async function findPushed(commitId,userId){
      const pushCommit = await commitAPI.findPushed(commitId, userId)
      setPush(pushCommit)
    }
    async function getAllPulledUsers(commitId){
        const pulledUsers = await commitAPI.getAllPulledUsers(commitId)
        setPulledUsers(pulledUsers)
    }
    async function getCommit(commitId){
      const commit = await commitAPI.getCommit(commitId)
      setThisCommit(commit)
    }
    getCommit(commit._id)
    getAllPulledUsers(commit._id)
    getAllSubTasks(commit._id)
    findPushed(commit._id,user._id)
    findPull(commit._id, user._id)

  },[ buttonState, pull,editCommit, editComplete])

 function handleEdit(){
    setEditState(true)
    setEditCommit(thisCommit.name)
 }
  function renderButton(){
    if(push && push.push === true && push.user === currUser._id){
      return <Button  color="success" variant="shadow" className="t font-bold">pushed</Button>
    } else if (commit.push === false && commit.user._id === currUser._id) {
        return <Button variant="ghost" color="success" onClick={handlePushButton}>Push</Button>
    } else if (commit.push === true && commit.user._id != currUser._id ) {
        if(pulledCommit){
          return <Button color="secondary" variant="shadow" className="font-bold text-black" >Pulled</Button>
        } else {
          return <Button variant="ghost" color="secondary" >Pull</Button>
        }
    } else if (commit.push === false && commit.user._id != currUser._id){
        return <Button color="warning" variant="shadow"  className="font-bold">In progress</Button>
    } 
  }

  function renderExpandButton() {
    if(currUser._id === commit.user._id && commit.push != true ){
      return (
        <div className=" h-[95px] w-8 flex justify-center items-center mt-5 rounded-r-full absolute -right-10 "> 
          <span className="material-symbols-outlined ">
            expand_more
          </span>
        </div>)
    } else if (testTasks && testTasks[0]){
      return (
        <div className=" h-[95px] w-10 flex justify-center items-center mt-5 rounded-r-full absolute -right-10 "> 
          <span className="material-symbols-outlined ">
            expand_more
          </span>
        </div>)
    }
  }

return(
  <div>
    <div className="min-h-unit-24 flex items-center relative" onClick={()=>{
          handleActiveState(commit._id,testTasks,currUser._id,commit.user._id, commit)
      }}>
        <div className="absolute -right-10  top-0">
          {commit.user._id === currUser._id ?
                <Dropdown >
                    <DropdownTrigger >
                      <Button 
                      className=" h-8 border-none  "
                        variant="light" 
                      >
                        <span class="material-symbols-outlined">
                          settings
                        </span>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions">
                        <DropdownItem><div onClick={handleEdit}>edit</div></DropdownItem>
                        <DropdownItem><div onClick={() => handleDelete(commit._id)}>delete</div></DropdownItem>
                    </DropdownMenu>
              </Dropdown>
            :
                "" 
          }
        </div>
        {!editState ? 
            <Card  className="basis-full min-h-unit-24 mt-5 bg-gradient-to-r from-stone-700 to-stone-900  flex-row items-center">
              <CardBody   className="justify-center relative"  >
                <div className="absolute text-slate-300 -top-1 z-40">
                  @{commit.user.name}
                </div>
                <div className="text-2xl" >
                  {thisCommit.name}
                </div>
              </CardBody>
              <div className="flex ">
                {pulledUsers && commit.push ?
                <Dropdown>
                      <DropdownTrigger>
                        <AvatarGroup className="flex mr-10 " isBordered max={3}>
                          {/* {pulledUsers.map(pulledUser => <Chip className="shrink" color="default">{pulledUser.user.name}</Chip>)} */}
                          {pulledUsers.map(pulledUser => <Avatar name={`${pulledUser.user.name}`} className="h-10 w-10 bg-black"/>)}
                        </AvatarGroup>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions" items={pulledUsers}>
                          {(item) => (
                            <DropdownItem
                              key={item._id}
                              color={item.key === "delete" ? "danger" : "default"}
                              className={item.key === "delete" ? "text-danger" : ""}
                            >
                              {item.user.name}
                            </DropdownItem>
                          )}
                      </DropdownMenu>

                    </Dropdown> 
                  : 
                    ""
                }
                <div className="mr-4">
                    {renderButton()}
                </div>
                {/* <Button> <Link to={`commit/${commit._id}`}><h1 className="text-white">sub tasks</h1></Link></Button> */}
              </div>
            </Card>
          : 
            <Card  className="basis-full min-h-unit-24 mt-5 bg-gradient-to-r from-neutral-400 to-stone-500    flex-row items-center">
              <Button onClick={()=> setEditState(!editState)}>
                X
              </Button>
              <CardBody   className="justify-center relative">
                <form className="flex items-center mt-4" onSubmit={handleSubmit}>
                  <input className="w-11/12 mb-5 bg-white text-black " required value={editCommit} onChange={(evt) => setEditCommit(evt.target.value)} />
                  <button  className="mb-8 w-1/12">
                    Edit
                  </button>
                </form>
                <div className="absolute text-slate-900 top-3 z-40">
                  @{commit.user.name}
                </div>
              </CardBody>
              <div className="flex ">
                {/* <Button> <Link to={`commit/${commit._id}`}><h1 className="text-white">sub tasks</h1></Link></Button> */}
              </div>
            </Card>
        }
        {!editState ? renderExpandButton() : ""}
    </div>
    {!editState ? 
        <SubTakListHomeView commit={commit} activeState={activeState} activeCommit={activeCommit}  commitId={commit._id}  />
      :
        ""
    }
  </div>
)
}