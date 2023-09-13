import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup, DropdownMenu, DropdownItem, Dropdown,DropdownTrigger} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as projectAPI from "../../utilities/project-api"
export default function ProjectListItem({project, selectedProject, active, }){
  const [projectOwner, setProjectOwner] = useState("12") 
  const [projectMembers, setProjectMembers] = useState([])

  useEffect(function (){

    async function getProjectOwner() {
      const owner = await projectAPI.getProjectOwner(project.user)
      setProjectOwner(owner)
    }

    
    async function getProjectMembers(projectId) {
      const members = await projectAPI.getProjectMembers(projectId)
      setProjectMembers(members)
      console.log(members)
    }
    
    getProjectOwner()
    getProjectMembers(project._id)
  },[])
  return (
    <Card className="mt-10 mb-10 w-10/12 ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          {/* <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" /> */}
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-xl font-semibold leading-none text-default-600">{project.name}</h4>
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
        </div>
      </CardFooter>
  </Card> 

)
}