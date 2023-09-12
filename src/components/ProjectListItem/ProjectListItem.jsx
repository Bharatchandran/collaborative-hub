import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup} from "@nextui-org/react";
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
        <AvatarGroup isBordered max={3} total={10}>
        
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
        </div>
        <div className="flex ml-6">
        <Button><Link to={`project/${project._id}`}><h1 className="text-white">Project Details</h1></Link></Button>
        <Button><Link to={`${project._id}/addMembers`}>Add Members</Link></Button>
        </div>
      </CardFooter>
  </Card> 

)
}