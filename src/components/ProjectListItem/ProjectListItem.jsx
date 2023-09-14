import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup, DropdownMenu, DropdownItem, Dropdown,DropdownTrigger} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as projectAPI from "../../utilities/project-api"
import * as addmembersAPI from "../../utilities/addmembers-api"
export default function ProjectListItem({project, selectedProject, active,reloadProject, setReloadProject }){
  const [projectOwner, setProjectOwner] = useState("") 
  const [projectMembers, setProjectMembers] = useState([])
  const [addMemberState, setAddMemberState] = useState(false)
  const [users, setUsers] = useState([])
  const [editState, setEditState] = useState(-1)
  const [editProject, setEditProject] = useState("")
  const [thisProject, setThisProject] = useState("")
  const[editComplete, setEditComplete] = useState("")
  // const [reloadProject, setReloadProject] = useState(-1)
  async function handleAddMemberClick(projectId, userId){
    await addmembersAPI.addUser(projectId,userId)
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    handleEditSubmit(project._id, editProject)
    setEditState(!editState)
  }

  function handleEdit(){
    setEditState(true)
    setEditProject(thisProject.name)
    console.log(editState)
 }

 async function handleEditSubmit(projectId, editProject){
  const commit = await projectAPI.handleEditSubmit(projectId, editProject)
  setEditComplete("complete")
 
}

 async function handleDelete(projectId) {
  await projectAPI.handleDelete(projectId)
  setReloadProject(!reloadProject)
}

  useEffect(function (){

    async function getProjectOwner() {
      const owner = await projectAPI.getProjectOwner(project.user)
      setProjectOwner(owner)
    }

    async function getProject(projectId){
      const project = await projectAPI.getProject(projectId)
      setThisProject(project)
    }
    getProject(project._id)
  //   async function getAllUsers(){
  //     const allUsers = await addmembersAPI.getAllUsers()
  //     setUsers(allUsers)

  // }

  // getAllUsers()
    
    async function getProjectMembers(projectId) {
      const members = await projectAPI.getProjectMembers(projectId)
      setProjectMembers(members)
      console.log(members)
    }
    
    getProjectOwner()
    getProjectMembers(project._id)
  },[editComplete])
  return (
   <div className="flex  justify-center w-10/12 ">

    <Card className="mt-10 mb-10 w-full ">
    
     <div className="absolute right-0 z-40">
      <Dropdown  >
      <DropdownTrigger >
        <Button 
        className=" h-4 border-none hover:bg-none"
          variant="light" 
        >
          <span class="material-symbols-outlined">
settings
</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        
          <DropdownItem><div onClick={handleEdit}>edit</div></DropdownItem>
          <DropdownItem><div onClick={() => handleDelete(project._id)}>delete</div></DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
    </div>
    
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          {/* <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" /> */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-xl font-semibold leading-none text-default-600">{thisProject.name}</h4>
            <h5 className="text-xs tracking-tight text-default-400">@{projectOwner.name}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-40 overflow-hidden">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3 flex justify-between">
        <div className="flex gap-1">
          <Dropdown>
            <DropdownTrigger>
        <AvatarGroup isBordered max={3} >
         {projectMembers.map(member => <Avatar name={`${member.user.name}`} className="h-10 w-10 bg-black"/> )}
         
        </AvatarGroup>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={projectMembers}>
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
        </div>
        <div className="flex ml-6">
        <Button><Link to={`project/${project._id}`}><h1 className="text-white">Project Details</h1></Link></Button>
        <Button><Link to={`${project._id}/addMembers`}>Add Members</Link></Button>
        {/* <Button onClick={()=>setAddMemberState(!addMemberState)}>Add Members</Button> */}
        </div>
      </CardFooter>
      
     
  </Card> 
  <div>
      {editState === true ? <div className="flex absolute  justify-center
             bg-opacity-60 rounded-xl top-23 left-1/3   w-[700px] z-40 h-[500px] bg-gray-600">  
             <button className="absolute left-5 top-5" onClick={()=> setEditState(!editState)}>X</button> 
             <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <h1 className="text-4xl -mt-10 mb-10">Edit Commit</h1>
                    <input className="w-[500px] mb-5 bg-gray-900 text-white" required value={editProject} onChange={(evt) => setEditProject(evt.target.value)} />
                    <Button color="primary" type="submit">Submit</Button>
                    </form></div>:"" }
      
    </div>
  </div> 
)
}