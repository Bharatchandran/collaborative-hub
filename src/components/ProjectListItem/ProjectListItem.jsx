import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup, DropdownMenu, DropdownItem, Dropdown,DropdownTrigger, Input, Textarea} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as projectAPI from "../../utilities/project-api"
import * as addmembersAPI from "../../utilities/addmembers-api"
import { getUser } from '../../utilities/users-service';
export default function ProjectListItem({project, selectedProject, active,reloadProject, setReloadProject }){
  const [projectOwner, setProjectOwner] = useState("") 
  const [projectMembers, setProjectMembers] = useState([])
  const [addMemberState, setAddMemberState] = useState(false)
  const [users, setUsers] = useState([])
  const [currUser, setCurrUser] = useState(getUser());
  const [editState, setEditState] = useState(false)
  const [editProject, setEditProject] = useState("")
  const [editProjectDescription, setEditProjectDescription] = useState("")
  const [thisProject, setThisProject] = useState("")
  const[editComplete, setEditComplete] = useState("")
  // const [reloadProject, setReloadProject] = useState(-1)
  async function handleAddMemberClick(projectId, userId){
    await addmembersAPI.addUser(projectId,userId)
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    handleEditSubmit(project._id, editProject,editProjectDescription)
    setEditState(!editState)
    setReloadProject(!reloadProject)
  }

  function handleEdit(){
    setEditState(true)
    setEditProject(thisProject.name)
    setEditProjectDescription(thisProject.description)
    console.log(editState)
 }

 async function handleEditSubmit(projectId, editProject, editDescription){
  const commit = await projectAPI.handleEditSubmit(projectId, editProject, editDescription)
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
  },[editComplete, editState, editProjectDescription])
  return (
    <div className="flex  justify-center w-10/12 ">
    {!editState? <Card className="mt-10 bg-gradient-to-r from-slate-900 to-slate-800   mb-10 w-full ">
    
    <div className="absolute top-2 -right-0 z-40">
    {project.user === currUser._id?
    <Dropdown  >
    <DropdownTrigger >
      <Button 
      className=" h-4 border-none h-10 hover:bg-none"
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
  :
  ""
  }
     
   </div>
   
     <CardHeader className="justify-between mt-6">
       <div className="flex   w-full">
         {/* <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" /> */}
         <div className="flex w-full  flex-col gap-1 items-start justify-center">
           <h5 className=" ml-8 mb-2 text-xl tracking-tight text-default-400">@{projectOwner.name}</h5>
           <h4 className=" bg-gradient-to-r from-stone-600 to-stone-800  flex items-center w-full h-12    ml-7 rounded-t-xl  text-2xl font-semibold leading-none text-default-600"><span className="ml-4">{thisProject.name}</span></h4>
         </div>
       </div>
     </CardHeader>
     <CardBody className="flex justify-center ml-10 bg-gradient-to-r from-blue-900 to-indigo-900 min-h-unit-12 w-3/9 rounded-b-xl px-3 py-0 text-small text-default-40 overflow-hidden">
       <p className="ml-3 w-5/12  ">
         {thisProject.description}
         
      </p>
     </CardBody>
     <CardFooter className="gap-3 flex justify-between">
       <div className="flex gap-1">
         <Dropdown>
           <DropdownTrigger>
       <AvatarGroup className="ml-2" isBordered max={3} >
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
       {project.user === currUser._id? 
       <Button><Link to={`${project._id}/addMembers`}>Add Members</Link></Button>
       :
       ""
      }
       <Button><Link to={`project/${project._id}`}><h1 className="text-white">Project Details</h1></Link></Button>
       {/* <Button onClick={()=>setAddMemberState(!addMemberState)}>Add Members</Button> */}
       </div>
     </CardFooter>
     
    
 </Card> 
 :
 <div className="flex flex-col items-center relative  w-2/4">
   <Button className="absolute left-0" onClick={()=> setEditState(!editState)}>X</Button>
  <h1 className="text-4xl font-bold mt-3">Edit</h1>
 <Card className="mt-10 mb-10 bg-gradient-to-r from-neutral-500 to-stone-700 w-full bg-white text-black ">
    
    <div className="absolute right-0 z-40">
  
   </div>
     <form  className="flex flex-col" onSubmit={handleSubmit}>
     <CardHeader className="justify-between p-5">
       <div className="flex gap-5">
         {/* <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" /> */}
         <div className="flex flex-col gap-1 items-start justify-center">
           
           <h5 className="text-xs tracking-tight text-default-400">@{projectOwner.name}</h5>
           <input className="w-fit bg-slate-200 border-1  text-gray-800" required value={editProject} onChange={(evt) => setEditProject(evt.target.value)} />
         </div>
       </div>
       <div>
        <Button type="submit" color="primary">submit Edit</Button>
       </div>
     </CardHeader>
     <CardBody className="px-3 p-5 py-0 text-small text-default-40 overflow-hidden">
     <textarea variant="bordered" className="w-full p-2 rounded-xl h-20   text-sm  border-2 bg-slate-200 text-gray-800" required value={editProjectDescription} onChange={(evt) => setEditProjectDescription(evt.target.value)} />
     {/* <p>{thisProject.description}</p> */}
     
       
     </CardBody>
     </form>
     <CardFooter className="gap-3 flex justify-between">
       <div className="flex gap-1">
         
       </div>
      
     </CardFooter>
     
    
 </Card> </div> }
{/*    
  <div>
      {editState === true ? <div className="flex absolute  justify-center
             bg-opacity-60 rounded-xl top-1/2 left-1/2  w-[700px] z-40 h-[500px] bg-gray-600">  
             <button className="absolute left-5 top-5" onClick={()=> setEditState(!editState)}>X</button> 
             <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <h1 className="text-4xl -mt-10 mb-10">Edit Commit</h1>
                    <input className="w-[500px] mb-5 bg-gray-900 text-white" required value={editProject} onChange={(evt) => setEditProject(evt.target.value)} />
                    <Button color="primary" type="submit">Submit</Button>
                    </form></div>:"" }
      
    </div> */}
  </div> 
)
}